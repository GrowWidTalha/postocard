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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const schemas_1 = require("../schemas");
const user_1 = require("../data/user");
const two_factor_confirmation_1 = require("../data/two-factor-confirmation");
const account_1 = require("../data/account");
const db_1 = require("../db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
const loginHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hello world");
    try {
        const result = yield (0, authController_1.login)(req.body);
        if (result.error) {
            res.status(400).json({ error: result.error });
            return;
        }
        if (result.success) {
            res.status(200).json({ message: result.success });
            return;
        }
        if (result.twoFactor) {
            res.status(200).json({ twoFactor: true });
            return;
        }
        res.status(200).json({ message: 'Login successful' });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const registerHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, authController_1.register)(req.body);
        if (result.error) {
            res.status(400).json({ error: result.error });
            return;
        }
        if (result.success) {
            res.status(200).json({ message: result.success });
            return;
        }
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const verificationHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (!token) {
            res.status(400).json({ error: "Token is required" });
            return;
        }
        const result = yield (0, authController_1.newVerification)(token);
        if (result.error) {
            res.status(400).json({ error: result.error });
            return;
        }
        res.status(200).json({ message: result.success });
    }
    catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const resetHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, authController_1.reset)(req.body);
        if (result.error) {
            res.status(400).json({ error: result.error });
            return;
        }
        res.status(200).json({ message: result.success });
    }
    catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const newPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        const result = yield (0, authController_1.newPassword)(req.body, token);
        if (result.error) {
            res.status(400).json({ error: result.error });
            return;
        }
        res.status(200).json({ message: result.success });
    }
    catch (error) {
        console.error('Password update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const signInCallbackHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, account } = req.body;
        console.log("Starting signIn callback with:", { userId: user.id, provider: account === null || account === void 0 ? void 0 : account.provider });
        if ((account === null || account === void 0 ? void 0 : account.provider) !== "credentials") {
            console.log("Non-credentials provider, allowing sign in");
            res.status(200).json({ success: true });
            return;
        }
        console.log("Fetching existing user from database");
        const existingUser = yield (0, user_1.getUserById)(user.id);
        console.log("Found user:", existingUser);
        if (!existingUser || !existingUser.emailVerified) {
            console.log("User validation failed:", { exists: !!existingUser, emailVerified: existingUser === null || existingUser === void 0 ? void 0 : existingUser.emailVerified });
            res.status(401).json({ error: "User not verified" });
            return;
        }
        if (existingUser.isTwoFactorEnabled) {
            console.log("2FA is enabled, checking for confirmation");
            const twoFactorConfirmation = yield (0, two_factor_confirmation_1.getTwoFactorConfirmationByUserId)(existingUser.id);
            console.log("2FA confirmation status:", { exists: !!twoFactorConfirmation });
            if (!twoFactorConfirmation) {
                console.log("No 2FA confirmation found, denying access");
                res.status(401).json({ error: "2FA confirmation required" });
                return;
            }
            console.log("Deleting used 2FA confirmation");
            yield db_1.db.twoFactorConfirmation.delete({
                where: { id: twoFactorConfirmation.id },
            });
        }
        yield db_1.db.twoFactorConfirmation.upsert({
            where: {
                userId: user.id
            },
            create: {
                userId: user.id
            },
            update: {} // No updates needed, just ensure record exists
        });
        console.log("All checks passed, allowing sign in");
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.error('Sign in callback error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const linkAccountHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        yield db_1.db.user.update({
            where: {
                id: user.id,
            },
            data: {
                emailVerified: new Date(),
            },
        });
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.error('Link account error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const sessionHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { token, session } = req.body;
        const updatedSession = Object.assign({}, session);
        if (token.sub && updatedSession.user) {
            updatedSession.user.id = token.sub;
        }
        if (token.role && updatedSession.user) {
            updatedSession.user.role = token.role;
        }
        if (updatedSession.user) {
            updatedSession.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
        }
        if (updatedSession.user) {
            updatedSession.user.name = token.name;
            updatedSession.user.email = (_a = token.email) !== null && _a !== void 0 ? _a : '';
            updatedSession.user.isOAuth = token.isOAuth;
        }
        res.status(200).json({ session: updatedSession });
    }
    catch (error) {
        console.error('Session handler error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const jwtHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (!token.sub) {
            res.status(200).json({ token });
            return;
        }
        const existingUser = yield (0, user_1.getUserById)(token.sub);
        if (!existingUser) {
            res.status(200).json({ token });
            return;
        }
        const existingAccount = yield (0, account_1.getAccountByUserId)(existingUser.id);
        const updatedToken = Object.assign(Object.assign({}, token), { isOAuth: !!existingAccount, name: existingUser.name, email: existingUser.email, role: existingUser.role, isTwoFactorEnabled: existingUser.isTwoFactorEnabled });
        res.status(200).json({ token: updatedToken });
    }
    catch (error) {
        console.error('JWT handler error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const authorizeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = req.body;
        console.log("Starting authorize with credentials:", Object.assign(Object.assign({}, credentials), { password: "[REDACTED]" }));
        const validatedFields = schemas_1.LoginSchema.safeParse(credentials);
        console.log("Field validation result:", validatedFields);
        if (!validatedFields.success) {
            console.log("Validation failed, returning null");
            res.status(401).json({ user: null });
            return;
        }
        const { email, password } = validatedFields.data;
        console.log("Attempting to find user with email:", email);
        const user = yield (0, user_1.getUserByEmail)(email);
        console.log("Found user:", Object.assign(Object.assign({}, user), { password: "[REDACTED]" }));
        if (!user || !user.password) {
            console.log("User validation failed:", { exists: !!user, hasPassword: !!(user === null || user === void 0 ? void 0 : user.password) });
            res.status(401).json({ user: null });
            return;
        }
        console.log("Comparing passwords");
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        console.log("Password match result:", passwordMatch);
        if (passwordMatch) {
            console.log("Password matched, returning user");
            // Remove sensitive data before sending
            const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
            res.status(200).json({ user: userWithoutPassword });
            return;
        }
        console.log("Authorization failed, returning null");
        res.status(401).json({ user: null });
    }
    catch (error) {
        console.error('Authorize error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/login', loginHandler);
router.post('/register', registerHandler);
router.post('/new-verification', verificationHandler);
router.post('/reset', resetHandler);
router.post('/new-password', newPasswordHandler);
router.post('/signin-callback', signInCallbackHandler);
router.post('/link-account', linkAccountHandler);
router.post('/session', sessionHandler);
router.post('/jwt', jwtHandler);
router.post('/authorize', authorizeHandler);
exports.default = router;
