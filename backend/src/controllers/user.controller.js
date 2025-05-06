"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.userController = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const user_1 = require("../data/user");
const db_1 = require("../db");
const mail_1 = require("../lib/mail");
exports.userController = {
    getUsersByRole: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { role } = req.params;
            const users = yield db_1.db.user.findMany({
                where: { role: role },
                include: {
                    designs: true,
                    orders: true,
                    assignedOrders: true,
                },
            });
            res.status(200).json({ data: users, success: true });
        }
        catch (error) {
            console.error("Error fetching users by role:", error);
            res.status(500).json({ data: null, success: false, error: error });
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield db_1.db.user.delete({ where: { id } });
            res.status(200).json({ data: user, success: true, error: null });
        }
        catch (error) {
            res.status(500).json({ data: null, success: false, error: error.message });
        }
    }),
    createUserByRole: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, role } = req.body;
            const existingUser = yield (0, user_1.getUserByEmail)(email);
            if (existingUser) {
                return res.status(400).json({
                    data: null,
                    success: false,
                    error: "User with this email already exists.",
                });
            }
            const randomPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = yield bcrypt.hash(randomPassword, 10);
            const user = yield db_1.db.user.create({
                data: {
                    name,
                    email,
                    role,
                    emailVerified: new Date(),
                    isTwoFactorEnabled: true,
                    password: hashedPassword,
                },
            });
            yield db_1.db.twoFactorConfirmation.create({ data: { userId: user.id } });
            yield (0, mail_1.sendInvitationEmail)(email, randomPassword, role);
            res.status(201).json({ success: true, data: user, error: null });
        }
        catch (error) {
            console.error("Error creating user by role:", error);
            res.status(500).json({
                success: false,
                data: null,
                error: (error === null || error === void 0 ? void 0 : error.message) || "Unknown error",
            });
        }
    }),
};
