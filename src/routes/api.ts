import { Router } from "express";
import {
  resetPassword,
  login,
  register,
  sendOneTimePassword,
  verifyOtp,
  updatePassword,
  changePassword,
  activateUser,
} from "../controller/auth.controller";
import { allTweet, commentTweet, createTweet, deleteTweet, likeTweet } from "../controller/tweet.controller";
import userRouteValidation from "../validate/users";

export const api = Router();

api.post("/register", userRouteValidation("/register"), register);
api.post("/login", userRouteValidation("/login"), login);
api.post("/send-otp", userRouteValidation("/send-otp"), sendOneTimePassword);
api.post("/verify-otp", userRouteValidation("/verify-otp"), verifyOtp);
api.post("/activate", userRouteValidation("/activate"), activateUser);
api.post("/forgot-password", userRouteValidation("/forgot-password"), resetPassword);
api.post("/update-password", userRouteValidation("/update-password"), updatePassword);
api.post("/change-password", userRouteValidation("/change-password"), changePassword);
api.post("/twit", userRouteValidation("/twit"), createTweet);
api.get("/twit", userRouteValidation("/twit/all"), allTweet);
api.delete("/twit", userRouteValidation("/twit/delete"), deleteTweet);
api.post("/twit/comment", userRouteValidation("/twit/comment"), commentTweet);
api.post("/twit/like", userRouteValidation("/twit/like"), likeTweet);
