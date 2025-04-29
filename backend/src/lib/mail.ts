import { UserRole } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend("re_WWMNFFCq_JvNx83nnzfqUBwvsaPXyowt4")

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

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/new-verification?token=${token}`;
  console.log("sending email");
  await resend.emails.send({
    from: "authtoolkit@talhaali.xyz",
    to: email,
    subject: "Confirm your email",
    html: `
    <p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>
    `,
  });
};
export const sendPasswordResetToken = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "authtoolkit@talhaali.xyz",
    to: email,
    subject: "Reset your password.",
    html: `
    <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
    `,
  });
};

export const sendTwoFactorEmail = async (token: string, email: string) => {
  try {
    const mail = await resend.emails.send({
      from: "authtoolkit@talhaali.xyz",
      to: email,
      subject: "2FA Code ",
      html: `
                <p>2FA Code: ${token}</p>
                `,
    });
    console.log(mail)
  } catch (error) {
    console.log(error);
  }
};
