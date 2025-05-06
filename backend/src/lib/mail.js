"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTwoFactorEmail = exports.sendPasswordResetToken = exports.sendVerificationEmail = exports.sendInvitationEmail = void 0;
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
const sendInvitationEmail = (email, tempPassword, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mail = yield resend.emails.send({
            from: "postocard@talhaali.xyz",
            to: email,
            subject: "Invitation to PostoCard",
            html: `
                <h1>Welcome to PostoCard</h1>
                <p>You have been invited to PostoCard as a ${role.toLocaleLowerCase()}</p>
                <p>Your temporary password is: ${tempPassword}</p>
                <p>Click <a href="${role === "DESIGNER"
                ? "https://designer.postocard.com/"
                : "https://printing-provider.postocard.com/"}">here</a> to login</`,
        });
    }
    catch (error) {
        console.error("Something went wrong sending the invitation email: ", error);
    }
});
exports.sendInvitationEmail = sendInvitationEmail;
const sendVerificationEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const confirmationLink = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/new-verification?token=${token}`;
    console.log("sending email");
    yield resend.emails.send({
        from: "authtoolkit@talhaali.xyz",
        to: email,
        subject: "Confirm your email",
        html: `
    <p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>
    `,
    });
});
exports.sendVerificationEmail = sendVerificationEmail;
const sendPasswordResetToken = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const resetLink = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/new-password?token=${token}`;
    yield resend.emails.send({
        from: "authtoolkit@talhaali.xyz",
        to: email,
        subject: "Reset your password.",
        html: `
    <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
    `,
    });
});
exports.sendPasswordResetToken = sendPasswordResetToken;
const sendTwoFactorEmail = (token, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mail = yield resend.emails.send({
            from: "authtoolkit@talhaali.xyz",
            to: email,
            subject: "2FA Code ",
            html: `
                <p>2FA Code: ${token}</p>
                `,
        });
        console.log(mail);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendTwoFactorEmail = sendTwoFactorEmail;
