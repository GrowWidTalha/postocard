import { UserRole } from "@prisma/client";
import { Resend } from "resend";
import { string } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendInvitationEmail = async (
  email: string,
  tempPassword: string,
  role: UserRole
) => {
  try {
       const mail = await resend.emails.send({
        from: "postocard@talhaali.xyz",
        to: email,
        subject: "Invitation to PostoCard",
        html: `
              <h1>Welcome to PostoCard</h1>
              <p>You have been invited to PostoCard as a ${role.toLocaleLowerCase()}</p>
              <p>Your temporary password is: ${tempPassword}</p>
              <p>Click <a href="${
                role === "DESIGNER"
                  ? "https://designer.postocard.com/"
                  : "https://printing-provider.postocard.com/"
              }">here</a> to login</`,
      });
  } catch (error) {
    console.error("Something went wrong sending the invitation email: ", error);
  }
};
