import * as dotenv from "dotenv";
dotenv.config();

type Config = {
  BASEURL: string;
  NODE_ENV: string;
  PORT: number;
  SSL: boolean;
  SECRET_KEY: string;
  JWT_EXPIRY_TIME: string;
  REDIS_INSTANCE_URL: string;
  SENDGRID_API_KEY: string;
  WEBSITE: string;
  LOGO: string;
  MAIL_FROM_NAME: string;
  MAIL_FROM: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_LINK: string;
  DB_DIALECT: string;
  PUBLIC_ROUTES: string[] | [];
  BUSINESS_PUBLIC_ROUTES: string[] | [];
};

const getConfig = (): Config => {
  return {
    BASEURL: process.env.BASEURL!,
    NODE_ENV: process.env.NODE_ENV!,
    PORT: Number(process.env.PORT)!,
    REDIS_INSTANCE_URL: process.env.REDIS_INSTANCE_URL!,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY!,
    DB_LINK: process.env.DB_LINK!,
    WEBSITE: process.env.WEBSITE!,
    LOGO: process.env.LOGO!,
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME!,
    MAIL_FROM: process.env.MAIL_FROM!,
    SSL: true,
    SECRET_KEY: process.env.SECRET_KEY!,
    JWT_EXPIRY_TIME: process.env.JWT_EXPIRY_TIME!,
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: Number(process.env.DB_PORT),
    DB_DIALECT: process.env.DB_DIALECT!,

    PUBLIC_ROUTES: ["/", "/login", "/register", "/send-otp", "/verify-otp", "/change-password", "/forgot-password", "/activate"],
    BUSINESS_PUBLIC_ROUTES: [
      "/verify-business-otp",
      "/verify-business",
      "/register-business",
      "/get-user-businesses",
      "/get-business-pending-invites",
      "/upload-files",
      "/update-user-profile",
      "/get-user-data",
      "get-pending-requests",
      "/create-payroll",
      "/activate-payroll",
      "/delete-payroll",
    ],
  };
};

const getSanitzedConfig = (config: Config) => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
