import { NextFunction, Request, Response } from "express";
import { FnResponseDataType } from "../interface";
// import config from '../config/configSetup';
// import { getNotificationTemplateData } from '../services/mailer/templateData';
// import { prepareMail } from '../services/mailer/mailer';
// import { mailTemplate } from '../services/mailer/template';

export const handleResponse = (res: any, statusCode: number, status: boolean, message: string, data?: any) => {
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

export const successResponse = (res: any, message: string = "Operation successfull", data?: any) => {
  return res.status(200).json({
    status: true,
    message,
    data,
  });
};

export const errorResponse = (res: any, message: string = "An error occured", data?: any) => {
  return res.status(400).json({
    status: false,
    message,
    data,
  });
};

export const fnResponse = ({ status, message, data }: FnResponseDataType) => {
  return { status, message, data };
};

// api index
export const apiIndex = async (req: Request, res: Response) => successResponse(res, "API Working!");

// upload helper
export const uploads = async (req: Request, res: Response, next: NextFunction) => {
  const { query }: any = req;
  if (!["profile", "doc", "package", "business", undefined].includes(query.dir)) return errorResponse(res, "invalid dir");
  next();
};

export const generateOtp = () => {
  return Math.floor(Math.random() * 999999 + 1);
};

export const addMinutesToDate = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000);
};

export const otpValidity = (a: Date, b: Date) => {
  if (a.getTime() > b.getTime()) return true;
  return false;
};

export const randId = () => {
  return Math.floor(Math.random() * 100000000000 + 1).toString(16);
};

export const validateObject = (obj: any) => {
  for (var key in obj) {
    if (obj[key] == null || obj[key] == "") return false;
  }
  return true;
};

export const validateData = (data: string | number, type: "string" | "number") => {
  if (typeof data == type && data != "") {
    if (type == "number" && isNaN(Number(data))) {
      // validateDataErrorMsg(data,type,resource,errorArr,config,rowData);
      return false;
    }
    return data;
  }
  // validateDataErrorMsg(data,type,resource,errorArr,config,rowData);
  return false;
};

export const getDateDifferenceInMinutes = (date1: any, date2: any) => {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60));
};

export const generateUUID = () => {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};
