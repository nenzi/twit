// Import types
import { OtpMailTemplateDataType } from "../../interface";
import config from "../../config/configSetup";

export const mailTemplate = ({ subject, body }: OtpMailTemplateDataType) => {
  return `
    
      <!DOCTYPE html>
      <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

      <head>
          <meta charset="utf-8">
          <meta name="x-apple-disable-message-reformatting">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
          <!--[if mso]>
          <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
          <style>
          td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
          </style>
      <![endif]-->
          <title>${subject}</title>
          <link href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700" rel="stylesheet" media="screen">
          <style>
          .hover-underline:hover {
              text-decoration: underline !important;
          }

          @keyframes spin {
              to {
              transform: rotate(360deg);
              }
          }

          @keyframes ping {

              75%,
              100% {
              transform: scale(2);
              opacity: 0;
              }
          }

          @keyframes pulse {
              50% {
              opacity: .5;
              }
          }

          @keyframes bounce {

              0%,
              100% {
              transform: translateY(-25%);
              animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
              }

              50% {
              transform: none;
              animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
              }
          }

          @media (max-width: 600px) {
              .sm-leading-32 {
              line-height: 32px !important;
              }

              .sm-px-24 {
              padding-left: 24px !important;
              padding-right: 24px !important;
              }

              .sm-py-32 {
              padding-top: 32px !important;
              padding-bottom: 32px !important;
      }

      .sm-w-full {
        width: 100% !important;
      }
    }
  </style>
</head>

<body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; --bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity));">
  <div style="display: none;">${subject}</div>
  <div role="article" aria-roledescription="email" aria-label="${subject}" lang="en">
    <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
          <table style="font-family: 'Montserrat',Arial,sans-serif; width: 600; margin-left: auto; margin-right: auto; margin-top: 2;" width="600" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="sm-px-24" style="--bg-opacity: 1; background-color: #ffffff; background-color: rgba(255, 255, 255, var(--bg-opacity)); border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262; color: rgba(98, 98, 98, var(--text-opacity));" bgcolor="rgba(255, 255, 255, var(--bg-opacity))" align="left">
                <a href="${config.WEBSITE}">
                  <img src="${
                    config.LOGO
                  }" width="120" alt="fida" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; display: block; margin-left: auto; margin-right: auto;">
                </a>

                
                ${body}
                
                
                <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                      <div style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); height: 1px; line-height: 1px;">&zwnj;</div>
                    </td>
                  </tr>
                </table>
                <p style="margin: 0 0 16px;">
                  Not sure why you received this email? Please
                  <a href="mailto:${"mail@travoofy.com"}" class="hover-underline" style="--text-opacity: 1; color: #7367f0; text-decoration: none;">let us know</a>.
                </p>
                <p style="margin: 0 0 16px;">Thanks, <br>The fida Team</p>
                <p style="cursor: default; margin-bottom: 16px;">
                  <a href="${"https://www.linkedin.com/company/fida"}" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://res.cloudinary.com/bringforthjoy/image/upload/v1612088046/INVESTA/social/027-linkedin_yfjwq5.png" width="17" alt="Facebook" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                  
                  <a href="${"https://twitter.com/fida"}" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://res.cloudinary.com/bringforthjoy/image/upload/v1612088043/INVESTA/social/008-twitter_be0fxj.png" width="17" alt="Twitter" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                  
                  <a href="${"https://instagram.com/fida"}" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://res.cloudinary.com/bringforthjoy/image/upload/v1612088041/INVESTA/social/029-instagram_u7embu.png" width="17" alt="Instagram" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>

</html>

    `;
};
