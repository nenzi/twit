declare module "express-serve-static-core" {
  export interface Request {
    user: any;
    admin: any;
  }
}

//interface
export interface UserDto {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface UpdateUserDto {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  status: boolean;
}

export interface userExistsDto {
  email?: string;
  phone?: string;
}

export interface loginInterface {
  email: string;
  password: string;
}

export interface AuthPayloadDataType {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  status: string;
  type: AuthIdentity.USER;
}

export interface CreateTweet {
  text: string;
  userId: number | string;
}

//types
export type FnResponseDataType = {
  status: boolean;
  message: string;
  data?: any;
};

export type AdminAuthPayloadDataType = {
  id: number;
  names: string;
  phone: string;
  email: string;
  status: string;
  accountDetails?: string;
  role?: string;
  type: string;
};

export type TokenDataType = {
  type: TokenTypeEnum;
  token: string;
  user?: AuthPayloadDataType;
  admin?: AdminAuthPayloadDataType;
};

export type VerifyOtpDataType = {
  token: string;
  otp: number;
  client: string;
  type: TokenTypeEnum;
};

export type OtpDetailsDataType = {
  timestamp: Date;
  client: string;
  password?: string;
  success: boolean;
  message: string;
  otpId: number;
  userId?: string | number;
  walletData?: {
    walletId?: string | number;
    walletName?: string;
    bankCode?: string;
    accountNumber?: string;
    accountName?: string;
    bankName?: string;
    amount?: string;
    narration?: string;
  };
};

export type SendOtpDataType = {
  channel: string;
  type: ValidOtpType;
  password?: string;
  userId?: string | number;
  walletData?: {
    walletId?: string | number;
    walletName?: string;
    bankCode?: string;
    accountNumber?: string;
    accountName?: string;
    bankName?: string;
    amount?: string;
    narration?: string;
  };
};

export type SendMailDataType = {
  senderName: string;
  senderEmail: string;
  mailRecipients: string[] | string;
  mailSubject: string;
  mailBody: string;
  mailAttachments?: string;
};

export type PrepareMailDataType = {
  mailRecipients: string[] | string;
  mailSubject: string;
  mailBody: string;
  senderName: string;
  senderEmail: string;
};

export type AdminOnboardingTemplateData = {
  names: string;
  role: string;
  password: string;
};

export type GetOtpTemplateDataType = {
  otp: number;
  type: ValidOtpType;
  meta?: any;
};

export type InvitegTemplateData = {
  names: string;
  businessname: string;
  type: UserTypeEnum;
};

export type OtpMailTemplateDataType = {
  subject: string;
  body: string;
};

export type ChangePasswordDataType = {
  token: string;
  password: string;
};

export type ActivateUserDataType = {
  email: string;
};

export enum TwoFaChannel {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
}

export enum ValidOtpType {
  VERIFICATION = "VERIFICATION",
  BUSINESS_AUTH = "BUSINESS_AUTH",
  RESET = "RESET",
  TWOFA = "TWOFA",
  BUSINESS_WALLET_ACCESS = "BUSINESS_WALLET_ACCESS",
}

//enum
export enum AuthIdentity {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum TokenTypeEnum {
  VERIFICATION = "VERIFICATION",
  RESET = "RESET",
  TOKEN = "TOKEN",
}

export enum ValidStatus {
  ACTIVATED = "ACTIVATE",
  DEACTIVATED = "DEACTIVATE",
}

export enum UserTypeEnum {
  OLDUSER = "OLDUSER",
  NEWUSER = "NEWUSER",
}
export enum MailType {
  REG_SUCCESS = "REG_SUCCESS",
  BUSINESS_REG_SUCCESS = "BUSINESS_REG_SUCCESS",
}
