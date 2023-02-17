// import packages
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

//import services
import config from "../config/configSetup";
import { Redis } from "../services/redis";
import { verifyOTP, sendOtp, activateAccount } from "../helpers/auth";
import { errorResponse, successResponse, handleResponse } from "../helpers/utility";
import { UserService } from "../services/user.services";
import { VerifyOtpDataType, ValidOtpType, FnResponseDataType, ChangePasswordDataType, ActivateUserDataType } from "../interface";
import { UserStatus } from "../models/Users";
import User from "../models/Users";

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, "validation error", errors.array());

  let { fullName, email, password, phone } = req.body;

  //Hash password
  const salt: string = await bcrypt.genSalt(15);
  const hashPassword: string = await bcrypt.hash(password, salt);
  password = hashPassword;
  try {
    const userService = new UserService();

    //check user exist
    const checkUser = await userService.checkUser({ email, phone });
    if (checkUser) return errorResponse(res, "user already exists");

    //register user
    const user = await userService.register({ fullName, email, password, phone });

    return successResponse(res, "Registration successfull", user.data);
  } catch (err) {
    console.log(err);
    return errorResponse(res);
  }
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, "validation error", errors.array());

  const { email, password } = req.body;

  try {
    const service = new UserService();
    const login = await service.login({ email: email, password: password });
    return successResponse(res, login?.message, login?.data);
  } catch (err) {
    return errorResponse(res);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, "Validation Error", errors.array());

  const { email } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    if (!user) return handleResponse(res, 401, false, `Incorrect Email`);
    const sendOtpResponse: FnResponseDataType = await sendOtp({ channel: email, type: ValidOtpType.RESET });
    if (!sendOtpResponse.status) return errorResponse(res, sendOtpResponse.message);
    return successResponse(res, sendOtpResponse.message, sendOtpResponse.data);
  } catch (error) {
    console.log(error);
    return handleResponse(res, 401, false, `An error occured - ${error}`);
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, "Validation Error", errors.array());

  const { email, oldPassword, newPassword } = req.body;
  try {
    const user = await User.findOne({
      where: { email, status: UserStatus.ACTIVE },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!user) return errorResponse(res, `user not found!`);
    const validPassword: boolean = await bcrypt.compareSync(oldPassword, user.password);
    if (!validPassword) return errorResponse(res, `Incorrect  old password!`);
    const salt = await bcrypt.genSalt(15);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    const updatedPassword = await user.update({ password: hashPassword });
    if (!updatedPassword) return errorResponse(res, `Unable update password!`);
    return successResponse(res, `Password updated successfully`);
  } catch (error) {
    console.log(error);
    return errorResponse(res, `An error occured - ${error}`);
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, "Validation Error", errors.array());
  }
  const { token, password }: ChangePasswordDataType = req.body;

  try {
    const decoded: any = jwt.verify(token, config.SECRET_KEY);
    if (!decoded) return errorResponse(res, `Invalid verification`);

    const user = await User.findOne({ where: { email: decoded.client, status: "ACTIVE" }, attributes: { exclude: ["createdAt", "updatedAt"] } });
    if (!user) return errorResponse(res, `Account Suspended!, Please contact support!`);
    const salt: string = await bcrypt.genSalt(15);
    const hashPassword: string = await bcrypt.hash(password, salt);
    const updatedPassword: any = await user.update({ password: hashPassword });
    if (!updatedPassword) return errorResponse(res, `Unable update password!`);
    return successResponse(res, `Password changed successfully`);
  } catch (error) {
    console.log(error);
    return errorResponse(res, `An error occured - ${error}`);
  }
};

export const sendOneTimePassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, "Validation Error", errors.array());

  const { email, type, userId } = req.body;
  const regData = await sendOtp({ channel: email, type, userId });
  if (!regData.status) return errorResponse(res, "An error occured");
  return successResponse(res, regData.message, regData.data);
};

export const verifyOtp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, "Validation Error", errors.array());
  try {
    const { token, otp, client, type }: VerifyOtpDataType = req.body;
    const result = await verifyOTP(token, otp, client, type, req.user);
    if (!result.status) return errorResponse(res, result.message);
    return successResponse(res, result.message, result.data);
  } catch (error) {
    console.log(error);
    return errorResponse(res, `An error occured - ${error}`);
  }
};

export const activateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, "Validation Error", errors.array());

  try {
    const redis = new Redis();

    const { email }: ActivateUserDataType = req.body;
    const verified = await redis.getData(email);
    if (verified != "verified") return errorResponse(res, "Email Address not verified");

    const result = await activateAccount(email);
    if (!result.status) return errorResponse(res, result.message);
    return successResponse(res, result.message, result.data);
  } catch (error) {
    console.log(error);
    return errorResponse(res, `An error occured - ${error}`);
  }
};
