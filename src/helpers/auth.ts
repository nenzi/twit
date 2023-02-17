import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../models/Users";
import { UserStatus } from "../models/Users";
import { Otp } from "../models/Otp";
import { fnResponse } from "./utility";
import config from "../config/configSetup";
import { otpValidity, generateOtp, addMinutesToDate } from "./utility";
import { loginInterface, AuthPayloadDataType, AuthIdentity, TokenTypeEnum, TokenDataType, SendOtpDataType, OtpDetailsDataType } from "../interface";
import { prepareMail } from "../services/mailer/mailer";
import { mailTemplate } from "../services/mailer/template";
import { getOtpTemplateData } from "../services/mailer/templateData";
import { Redis } from "../services/redis";

export const login = async ({ email, password }: loginInterface) => {
  try {
    const user = await User.findOne({ where: { email }, attributes: { exclude: ["createdAt", "updatedAt"] } });

    if (!user) return fnResponse({ status: false, message: "Incorrect Email" });
    const validPass: boolean = await bcrypt.compareSync(password, user.password);
    if (!validPass) return fnResponse({ status: false, message: "Email or Password is incorrect!" });
    if (user.status === UserStatus.INACTIVE) return fnResponse({ status: false, message: "Account pending activation!, Please contact support!" });

    // Create and assign token
    let payload: AuthPayloadDataType = {
      id: Number(user.id),
      email,
      fullName: user.fullName,
      phone: user.phone,
      status: user.status,
      type: AuthIdentity.USER,
    };
    const token: string = jwt.sign(payload, config.SECRET_KEY);
    const data: TokenDataType = { type: TokenTypeEnum.TOKEN, token, user: payload };
    return fnResponse({ status: true, message: "Login successfull", data });
  } catch (error) {
    console.log(error);
    return fnResponse({ status: false, message: `An error occured - ${error}` });
  }
};

export const verifyOTP = async (token: string, otp: string | number, client: string, type: TokenTypeEnum, user?: any) => {
  const currentdate = new Date();
  const redis = new Redis();

  const decoded: any = jwt.verify(token, config.SECRET_KEY);
  if (!decoded) return fnResponse({ status: false, message: `Invalid verification` });
  console.log({ decoded });

  if (decoded.client != client) return fnResponse({ status: false, message: `OTP was not sent to this particular email` });

  const otpInstance = await Otp.findOne({ where: { id: decoded.otpId } });

  if (!otpInstance) return fnResponse({ status: false, message: `OTP does not exists` });
  if (otpInstance.verified) return fnResponse({ status: false, message: `OTP Already Used` });
  if (!otpValidity(otpInstance.expirationTime, currentdate)) return fnResponse({ status: false, message: "OTP Expired" });
  if (otp != otpInstance.otp) return fnResponse({ status: false, message: "OTP NOT Matched" });
  await otpInstance.update({ verified: true, verifiedAt: currentdate });

  switch (type) {
    // case TokenTypeEnum.TWOFA:
    //   const loginResponse: FnResponseDataType = await login({ email: client, password: decoded.password });
    //   if (!loginResponse.status) return fnResponse({ status: false, message: loginResponse.message });
    //   return fnResponse({ status: true, message: "Login Successful", data: loginResponse.data });
    case TokenTypeEnum.RESET:
      if (decoded.password) return fnResponse({ status: false, message: "Suspicious attempt discovered! Pls reset password again" });
      return fnResponse({ status: true, message: "OTP Matched", data: token });
    case TokenTypeEnum.VERIFICATION:
      await redis.setData(client, "verified", 3600 * 24);
      return fnResponse({ status: true, message: "Email verified" });
    default:
      return fnResponse({ status: false, message: "" });
  }
};

export const activateAccount = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email }, attributes: { exclude: ["createdAt", "updatedAt"] } });
    if (!user) return fnResponse({ status: false, message: "User not found!" });
    await user.update({ status: "ACTIVE" });
    const data = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      status: user.status,
    };
    return fnResponse({ status: true, message: "User Activated", data });
  } catch (error) {
    console.log(error);
    return fnResponse({ status: false, message: `An error occured - ${error}` });
  }
};

export const sendOtp = async ({ channel, type, password, userId, walletData }: SendOtpDataType) => {
  try {
    //Generate OTP
    const otp: number = generateOtp(),
      now: Date = new Date(),
      expirationTime: Date = addMinutesToDate(now, 10);

    const otpInstance = await Otp.create({ otp, expirationTime });

    // Create details object containing the email and otp id
    let otpDetails: OtpDetailsDataType = {
      timestamp: now,
      client: channel,
      password,
      success: true,
      message: "OTP sent to user",
      otpId: otpInstance.id,
      userId,
    };

    // Encrypt the details object
    const encoded: string = jwt.sign(JSON.stringify(otpDetails), config.SECRET_KEY);

    const { mailSubject, mailBody } = getOtpTemplateData({ otp, type });

    // prepare and send mail
    const sendEmail = await prepareMail({
      mailRecipients: channel,
      mailSubject,
      mailBody: mailTemplate({ subject: mailSubject, body: mailBody }),
      senderName: config.MAIL_FROM_NAME,
      senderEmail: config.MAIL_FROM,
    });

    if (sendEmail.status) return fnResponse({ status: true, message: "OTP Sent", data: encoded });
    return fnResponse({ status: false, message: "OTP not sent" });
  } catch (error: any) {
    console.log(error);
    return fnResponse({ status: false, message: `An error occured:- ${error}` });
  }
};
