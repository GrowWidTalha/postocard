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
exports.generatePasswordResetToken = exports.generateVerificationToken = exports.generateTwoFactorToken = void 0;
const uuid_1 = require("uuid");
const crypto_1 = __importDefault(require("crypto"));
const verification_token_1 = require("../data/verification-token");
const db_1 = require("../db");
const password_reset_token_1 = require("../data/password-reset-token");
const two_factor_token_1 = require("../data/two-factor-token");
const generateTwoFactorToken = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const token = crypto_1.default.randomInt(100000, 1000000).toString();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = yield (0, two_factor_token_1.getTwoFactorTokenByEmail)(email);
    if (existingToken) {
        yield db_1.db.twoFactorToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }
    const twoFactorToken = yield db_1.db.twoFactorToken.create({
        data: {
            email,
            expires,
            token,
        },
    });
    return twoFactorToken;
});
exports.generateTwoFactorToken = generateTwoFactorToken;
const generateVerificationToken = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, uuid_1.v4)();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = yield (0, verification_token_1.getVerificationTokenByEmail)(email);
    if (existingToken) {
        yield db_1.db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }
    const verificationToken = yield db_1.db.verificationToken.create({
        data: {
            email,
            expires,
            token,
        },
    });
    return verificationToken;
});
exports.generateVerificationToken = generateVerificationToken;
const generatePasswordResetToken = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, uuid_1.v4)();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = yield (0, password_reset_token_1.getPasswordRestTokenByEmail)(email);
    if (existingToken) {
        yield db_1.db.passwordResetToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }
    const passwordResetToken = yield db_1.db.passwordResetToken.create({
        data: {
            email,
            expires,
            token,
        },
    });
    return passwordResetToken;
});
exports.generatePasswordResetToken = generatePasswordResetToken;
