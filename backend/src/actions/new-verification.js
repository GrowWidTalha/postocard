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
exports.newVerification = void 0;
const newVerification = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/new-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        const data = yield response.json();
        if (!response.ok) {
            return { error: data.error || "Something went wrong" };
        }
        return { success: data.message || "Email verified successfully" };
    }
    catch (error) {
        console.error('Error in new verification:', error);
        return { error: "Something went wrong" };
    }
});
exports.newVerification = newVerification;
