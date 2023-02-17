//import packages
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//import services
import config from "../config/configSetup";
import { User } from "../models/Users";
import { UpdateUserDto, UserDto, userExistsDto, loginInterface } from "../interface";
import { Op } from "sequelize";
import { fnResponse } from "../helpers/utility";

export class UserService {
  public async register({ fullName, email, password, phone }: UserDto) {
    try {
      const user = await User.create({ fullName, email, password, phone });
      return fnResponse({ status: true, message: `User registered successfully!`, data: user });
    } catch (error) {
      // console.log(error);
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }

  public async login({ email, password }: loginInterface) {
    try {
      const user = await User.findOne({
        where: { email },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (!user) return fnResponse({ status: false, message: `Incorrect Email` });

      if (user.status) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          const token = jwt.sign(user.toJSON(), config.SECRET_KEY as string, { expiresIn: "30d" });
          return fnResponse({ status: true, message: "login successfull", data: token.toString() });
        } else {
          return fnResponse({ status: false, message: "Incorrect Password" });
        }
      }
    } catch (err) {
      console.log(err);
      return fnResponse({ status: false, message: `An error occured - ${err}` });
    }
  }

  public async getAll() {
    try {
      const data = await User.findAll();
      if (!data.length) return fnResponse({ status: true, message: `No user available!`, data });
      return fnResponse({ status: true, message: `${data.length} users${data.length > 1 ? "s" : ""} retrived!`, data });
    } catch (error) {
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }

  public async getOne(id: number, attributes: string[]) {
    try {
      const data = await User.findOne({ where: { id }, attributes });
      if (!data) return fnResponse({ status: false, message: `User with id ${id} not found!` });
      return fnResponse({ status: true, message: `User listed!`, data });
    } catch (error) {
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }

  public async checkUser({ email, phone }: userExistsDto) {
    try {
      const userExists: any = await User.findOne({
        where: { [Op.or]: [{ email }, { phone }] },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (userExists) return true;
      return false;
    } catch (error) {
      console.log(`An error occured - ${error}`);
      return false;
    }
  }

  public async checkEmail({ email }: userExistsDto) {
    try {
      const userExists: any = await User.findOne({
        where: { [Op.or]: [{ email }] },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (userExists) return true;
      return false;
    } catch (error) {
      console.log(`An error occured - ${error}`);
      return false;
    }
  }

  public async update({ id, email, password, phone, status }: UpdateUserDto) {
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) return fnResponse({ status: false, message: `User with id ${id} not found!` });
      const updateData = {
        fullName: email ? email : user.fullName,
        email: email ? email : user.email,
        password: password ? password : user.password,
        phone: phone ? phone : user.phone,
        status: status ? status : user.status,
      };
      await user.update(updateData);
      return fnResponse({ status: true, message: `User successfully updated!` });
    } catch (error) {
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }

  public async delete(id: number) {
    try {
      const data = await User.findOne({ where: { id } });
      if (!data) return fnResponse({ status: false, message: `Contact with id ${id} not found!` });
      await data.destroy({ force: true });
      return fnResponse({ status: true, message: `Contact successfully deleted!` });
    } catch (error) {
      return fnResponse({ status: false, message: `An error occured - ${error}` });
    }
  }
}
