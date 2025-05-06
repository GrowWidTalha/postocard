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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPassword = exports.reset = exports.newVerification = exports.register = exports.login = void 0;
const schemas_1 = require("../schemas");
const user_1 = require("../data/user");
const two_factor_token_1 = require("../data/two-factor-token");
const tokens_1 = require("../lib/tokens");
const mail_1 = require("../lib/mail");
const verification_token_1 = require("../data/verification-token");
const password_reset_token_1 = require("../data/password-reset-token");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../db");
const login = (values) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Starting login process with values:", values);
    // Validate incoming fields
    const validatedFields = schemas_1.LoginSchema.safeParse(values);
    console.log("Field validation result:", validatedFields);
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }
    const { email, password, code } = validatedFields.data;
    // Fetch the user by email
    const existingUser = yield (0, user_1.getUserByEmail)(email);
    console.log("Found user:", Object.assign(Object.assign({}, existingUser), { password: "[REDACTED]" }));
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email doesn't exist" };
    }
    // Verify password
    const passwordMatch = yield bcryptjs_1.default.compare(password, existingUser.password);
    if (!passwordMatch) {
        return { error: "Invalid credentials" };
    }
    // If the email isn't verified, send a verification email
    console.log("Checking email verification status:", { emailVerified: existingUser.emailVerified });
    if (!existingUser.emailVerified) {
        const verificationToken = yield (0, tokens_1.generateVerificationToken)(existingUser.email);
        console.log("Generated verification token:", { token: verificationToken.token });
        yield (0, mail_1.sendVerificationEmail)(verificationToken.email, verificationToken.token);
        return { success: "Confirmation email sent" };
    }
    // Restrict access to admins only
    console.log("Checking user role:", { role: existingUser.role });
    if (existingUser.role !== "ADMIN") {
        return { error: "Only admins can access this dashboard!" };
    }
    // Handle two-factor authentication if enabled
    console.log("Checking 2FA status:", {
        isTwoFactorEnabled: existingUser.isTwoFactorEnabled,
        hasCode: !!code
    });
    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const token = yield (0, two_factor_token_1.getTwoFactorTokenByEmail)(existingUser.email);
            console.log("2FA token verification:", {
                tokenExists: !!token,
                tokenMatches: (token === null || token === void 0 ? void 0 : token.token) === code,
                tokenExpiry: token === null || token === void 0 ? void 0 : token.expires
            });
            if (!token)
                return { error: "Invalid code" };
            if (token.token !== code)
                return { error: "Invalid code!" };
            if (new Date(token.expires) < new Date()) {
                return { error: "Code Expired" };
            }
        }
        else {
            // Generate a new two-factor token and send it via email
            const twoFactorToken = yield (0, tokens_1.generateTwoFactorToken)(email);
            console.log("Generated new 2FA token:", { token: twoFactorToken.token });
            yield (0, mail_1.sendTwoFactorEmail)(twoFactorToken.token, twoFactorToken.email);
            return { twoFactor: true };
        }
    }
    // Return success response with user data (excluding sensitive information)
    return {
        success: true,
        user: {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
            isTwoFactorEnabled: existingUser.isTwoFactorEnabled
        }
    };
});
exports.login = login;
const register = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedFields = schemas_1.RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }
    const { name, email, password } = validatedFields.data;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const existingUser = yield (0, user_1.getUserByEmail)(email);
    if (existingUser) {
        return { error: "Email already taken." };
    }
    const user = yield db_1.db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    const verificationtoken = yield (0, tokens_1.generateVerificationToken)(email);
    yield (0, mail_1.sendVerificationEmail)(verificationtoken.email, verificationtoken.token);
    yield db_1.db.twoFactorConfirmation.create({
        data: {
            userId: user.id,
        },
    });
    return { success: "Confirmation email sent!" };
});
exports.register = register;
const newVerification = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingToken = yield (0, verification_token_1.getVerificationTokenByToken)(token);
        if (!existingToken)
            return { error: "Token does not exist." };
        const hasExpired = new Date(existingToken.expires) < new Date();
        if (hasExpired)
            return { error: "Token expired" };
        const existingUser = yield (0, user_1.getUserByEmail)(existingToken.email);
        if (!existingUser)
            return { error: "Email does not exist" };
        yield db_1.db.user.update({
            where: {
                id: existingUser.id,
            },
            data: {
                emailVerified: new Date(),
                email: existingToken.email,
            },
        });
        yield db_1.db.verificationToken.delete({
            where: { id: existingToken.id },
        });
        return { success: "Email verified successfully" };
    }
    catch (error) {
        console.log("Error in new verification", error);
        return { error: "Something went wrong" };
    }
});
exports.newVerification = newVerification;
const reset = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedFields = schemas_1.ResetSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid Email!" };
    }
    const { email } = validatedFields.data;
    const existingUser = yield (0, user_1.getUserByEmail)(email);
    if (!existingUser) {
        return { error: "Email not found." };
    }
    const passwordResetToken = yield (0, tokens_1.generatePasswordResetToken)(email);
    yield (0, mail_1.sendPasswordResetToken)(passwordResetToken.email, passwordResetToken.token);
    return { success: "Reset email sent." };
});
exports.reset = reset;
const newPassword = (values, token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        return { error: "Missing token" };
    }
    const validatedFields = schemas_1.NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid password" };
    }
    const { password } = validatedFields.data;
    const existingToken = yield (0, password_reset_token_1.getPasswordRestTokenByToken)(token);
    if (!existingToken)
        return { error: "Invalid token" };
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired)
        return { error: "Token has expired." };
    const existingUser = yield (0, user_1.getUserByEmail)(existingToken.email);
    if (!existingUser)
        return { error: "User not found" };
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    yield db_1.db.user.update({
        where: { id: existingUser.id },
        data: {
            password: hashedPassword,
        },
    });
    yield db_1.db.passwordResetToken.delete({
        where: { id: existingToken.id },
    });
    return { success: "Password updated" };
});
exports.newPassword = newPassword;
