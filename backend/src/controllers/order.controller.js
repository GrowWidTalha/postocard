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
exports.orderController = void 0;
const db_1 = require("../db");
exports.orderController = {
    // GET /orders
    getAllOrders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const orders = yield db_1.db.order.findMany({ include: { user: true } });
            return res.status(200).json({
                data: orders,
                success: true,
                error: null,
            });
        }
        catch (error) {
            console.error("Error fetching orders:", error);
            return res.status(500).json({
                data: null,
                success: false,
                error: error.message,
            });
        }
    }),
    // DELETE /orders/:id
    deleteOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deleted = yield db_1.db.order.delete({ where: { id } });
            return res.status(200).json({
                data: deleted,
                success: true,
                error: null,
            });
        }
        catch (error) {
            console.error("Error deleting order:", error);
            return res.status(500).json({
                data: null,
                success: false,
                error: error.message,
            });
        }
    }),
    // PATCH /orders/:id/assign
    assignOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { assigneeId } = req.body;
            const updated = yield db_1.db.order.update({
                where: { id },
                data: { assigneeId },
            });
            return res.status(200).json({
                data: updated,
                success: true,
                error: null,
            });
        }
        catch (error) {
            console.error("Error assigning order:", error);
            return res.status(500).json({
                data: null,
                success: false,
                error: error.message,
            });
        }
    }),
    // PATCH /orders/:id/status
    updateOrderStatus: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updated = yield db_1.db.order.update({
                where: { id },
                data: { status },
            });
            return res.status(200).json({
                data: updated,
                success: true,
                error: null,
            });
        }
        catch (error) {
            console.error("Error updating order status:", error);
            return res.status(500).json({
                data: null,
                success: false,
                error: error.message,
            });
        }
    }),
};
