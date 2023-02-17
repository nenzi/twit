// Import types
import { AdminOnboardingTemplateData, GetOtpTemplateDataType, InvitegTemplateData, MailType, UserTypeEnum, ValidOtpType } from "../../interface";

export const getOtpTemplateData = ({ otp, type, meta }: GetOtpTemplateDataType) => {
  switch (type) {
    case ValidOtpType.VERIFICATION:
      return {
        mailSubject: "Email Verification",
        mailBody: `
                                <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hi, User</p>
                                <p>OTP for your email verification is :</p>
                                <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">${otp}</p>
                                <p>This OTP is valid for only 10 minutes</p>
                        `,
      };
    case ValidOtpType.RESET:
      return {
        mailSubject: "Password Reset",
        mailBody: `
                                <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hi, User</p>
                                <p>OTP for your password reset request is :</p>
                                <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">${otp}</p>
                                <p>This OTP is valid for only 10 minutes</p>
                        `,
      };
    case ValidOtpType.TWOFA:
      return {
        mailSubject: "Two Factor Authentication",
        mailBody: `
                                <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hi, User</p>
                                <p>OTP for your 2FA is :</p>
                                <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">${otp}</p>
                                <p>This OTP is valid for only 10 minutes</p>
                        `,
      };
    case ValidOtpType.BUSINESS_AUTH:
      return {
        mailSubject: "Business 2FA",
        mailBody: `
                                        <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hi, User</p>
                                        <p>OTP for your Business 2FA is :</p>
                                        <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">${otp}</p>
                                        <p>This OTP is valid for only 10 minutes</p>
                                `,
      };
    case ValidOtpType.BUSINESS_WALLET_ACCESS:
      return {
        mailSubject: "Transaction Confirmation",
        mailBody: `
                                        <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hi, User</p>
                                        <p>A debit transaction of amount has been initiated on your shared account. Please, use the below OTP to confirm this transaction.</p>
                                        <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">${otp}</p>
                                        <p>This OTP is valid for only 10 minutes</p>
                                `,
      };
    default:
      return { mailSubject: "", mailBody: "" };
  }
};

export const adminOnboardingTemplateData = ({ names, password, role }: AdminOnboardingTemplateData) => {
  return {
    mailSubject: "Admin Onboarding",
    mailBody: `
                        <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Welcome onboard, ${names.split(" ")[0]}</p>
                        <p>A ${role} admnistrative account has been registered for you.</p>
                        <p>Your default password is "${password}" </p>
                        <p>Pls login with your email and the default password.</p>
                        <p>You will be prompted to change your account's default's password upon login.</p>
                `,
  };
};

export const staffOnboardingTemplateData = ({ names, businessname, type }: InvitegTemplateData) => {
  return {
    mailSubject: "Staff Onboarding",
    mailBody: `
                        <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Welcome onboard, ${names.split(" ")[0]}</p>
                        <p>you are requested to join ${businessname}.</p>
                        ${
                          type == UserTypeEnum.OLDUSER
                            ? `<p>Pls login into your account to review the request.</p>`
                            : `<p>click the link below to sign up on fida.</p>
                        <a href="https://fida.ng/">Sign up on fida.ng</a>
                        `
                        }
                        <p>You will be prompted to change your account's default's password upon login.</p>
                `,
  };
};

export const getNotificationTemplateData = ({ data, type }: { data: any; type: MailType }) => {
  switch (type) {
    case MailType.REG_SUCCESS:
      return {
        mailSubject: "Welcome On Board",
        mailBody: `
                                <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hi, ${data.name}</p>
                                <p>Welcome to Fida!</p>
                                <p>Some other message</p>
                        `,
      };
    case MailType.BUSINESS_REG_SUCCESS:
      return {
        mailSubject: "Business Registration Success",
        mailBody: `
                                        <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hi, ${data.name}</p>
                                        <p>Your business ${data.businessName} has been registered successfully!</p>
                                        <p>Some other message</p>
                                `,
      };
    default:
      return { mailSubject: "", mailBody: "" };
  }
};
