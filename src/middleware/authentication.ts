import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../helpers/utility";
import { AuthIdentity } from "../interface";
import config from "../config/configSetup";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.SECRET_KEY as string) as JwtPayload;
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export const isAuthorized = async (req: Request, res: Response, next: NextFunction) => {
  //this is the url without query params
  const route: any = req.originalUrl.split("?").shift();
  let publicRoutes: string[] = config.PUBLIC_ROUTES!;

  if (publicRoutes.includes(route) || (publicRoutes.includes(`/${route.split("/")[1]}`) && !isNaN(route.split("/")[3]))) return next();

  let token: any = req.headers.authorization;
  if (!token) return handleResponse(res, 401, false, `Access Denied / Unauthorized request`);

  try {
    token = token.split(" ")[1]; // Remove Bearer from string
    if (token === "null" || !token) return handleResponse(res, 401, false, `Unauthorized request`);
    let verified: any = jwt.verify(token, config.SECRET_KEY as string);
    if (!verified) return handleResponse(res, 401, false, `Unauthorized request`);

    if (verified.type === AuthIdentity.ADMIN) {
      req.admin = verified;
    } else {
      req.user = verified;
    }
    next();
  } catch (error) {
    handleResponse(res, 400, false, `Token Expired`);
  }
};

export const isAdmin = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.admin) return handleResponse(res, 401, false, `Unauthorized access`);
    if (!roles.includes(req.admin.role)) return handleResponse(res, 401, false, `Permission denied`);
    next();
  };
};

export const hasPermission = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("user role", req.user.role);
    if (!req.user.businessId) return handleResponse(res, 401, false, `Unauthorized access`);
    if (!roles.includes(req.user.role)) return handleResponse(res, 401, false, `Permission denied`);
    next();
  };
};
