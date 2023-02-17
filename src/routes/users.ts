import { Router } from "express";
import userValidations from "../validate/users";

export const userRoutes = Router();
userRoutes.get("/all", userValidations("/all"));
