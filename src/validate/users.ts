import { body, param } from "express-validator";
import { ValidOtpType, ValidStatus } from "../interface";

const users = (method: string): any => {
  switch (method) {
    case "/register": {
      return [
        body("fullName").not().isEmpty().isString().withMessage("FullName is required!"),
        // body('avatar').not().isEmpty().isString().withMessage('avatar is required!'),
        body("email").not().isEmpty().isString().withMessage("email is required!"),
        body("password").not().isEmpty().isString().withMessage("password is required!"),
        body("phone").not().isEmpty().isString().withMessage("phone is required!"),
      ];
    }
    case "/login": {
      return [
        body("email").not().isEmpty().isString().withMessage("Email is required!"),
        body("password").not().isEmpty().isString().withMessage("Password is required!"),
      ];
    }

    case "/check-email": {
      return [body("email").not().isEmpty().isString().withMessage("email is required!")];
    }

    case "/check-email": {
      return [body("email").not().isEmpty().isString().withMessage("Email is required!")];
    }

    case "/send-otp": {
      const validType = [ValidOtpType.VERIFICATION, ValidOtpType.RESET];
      return [
        body("email").not().isEmpty().isString().withMessage("Email is required!"),
        body("type")
          .not()
          .isEmpty()
          .custom((value) => validType.includes(value))
          .withMessage(`type can only include ${validType}`),
      ];
    }

    case "/verify-otp": {
      const validType = [ValidOtpType.VERIFICATION, ValidOtpType.RESET];
      return [
        body("token").not().isEmpty().isString().withMessage("token is required!"),
        body("client").not().isEmpty().isString().withMessage("client is required!"),
        body("type")
          .not()
          .isEmpty()
          .custom((value) => {
            return validType.includes(value);
          })
          .withMessage(`type can only include ${validType}`),
        body("otp")
          .not()
          .isEmpty()
          .custom((value) => {
            return Number(value);
          })
          .withMessage("otp is required!"),
      ];
    }

    case "/update-user-profile": {
      return [
        body("avatar").optional().isString().withMessage("avatar is required!"),
        body("displayName").optional().isString().withMessage("displayName is required!"),
        body("phone").optional().isString().withMessage("phone is required!"),
      ];
    }
    case "/update-password": {
      return [
        body("email").not().isEmpty().isString().withMessage("Email is required!"),
        body("oldPassword").not().isEmpty().isString().withMessage("Old password is required!"),
        body("newPassword").not().isEmpty().isString().withMessage("New password is required!"),
      ];
    }
    case "/forgot-password": {
      return [body("email").not().isEmpty().isString().withMessage("Email is required!")];
    }
    case "/change-password": {
      return [
        body("token").not().isEmpty().isString().withMessage("token is required!"),
        body("password").not().isEmpty().isString().withMessage("password is required!"),
      ];
    }
    case "/update/status": {
      const validStatus = [ValidStatus.ACTIVATED, ValidStatus.DEACTIVATED];
      return [
        param("id").isInt().withMessage("ID must be a number!"),
        body("status")
          .not()
          .isEmpty()
          .custom((value) => {
            return validStatus.includes(value);
          })
          .withMessage(`status can only include ${validStatus}`),
      ];
    }
    case "/activate": {
      return [body("email").not().isEmpty().isEmail().isString().withMessage("email required")];
    }

    case "/twit": {
      return [body("text").not().isEmpty().isString().withMessage("text required")];
    }

    case "/twit/all": {
      return [];
    }

    case "/twit/delete": {
      return [body("twitId").not().isEmpty().isInt().withMessage("twitId required")];
    }
    case "/twit/comment": {
      return [
        body("twitId").not().isEmpty().isInt().withMessage("twitId required"),
        body("text").not().isEmpty().isString().withMessage("text required"),
      ];
    }

    case "/twit/like": {
      return [body("twitId").not().isEmpty().isInt().withMessage("twitId required")];
    }
  }
};

export default users;
