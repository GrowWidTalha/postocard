import { Request, Response } from "express";
import { db } from "../db";
import { OrderStatus } from "@prisma/client";

export const orderController = {
  // GET /orders
  getAllOrders: async (req: Request, res: Response) => {
    try {
      const orders = await db.order.findMany({ include: { user: true } });
      return res.status(200).json({
        data: orders,
        success: true,
        error: null,
      });
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({
        data: null,
        success: false,
        error: error.message,
      });
    }
  },

  // DELETE /orders/:id
  deleteOrder: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await db.order.delete({ where: { id } });
      return res.status(200).json({
        data: deleted,
        success: true,
        error: null,
      });
    } catch (error: any) {
      console.error("Error deleting order:", error);
      return res.status(500).json({
        data: null,
        success: false,
        error: error.message,
      });
    }
  },

  // PATCH /orders/:id/assign
  assignOrder: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { assigneeId } = req.body;
      const updated = await db.order.update({
        where: { id },
        data: { assigneeId },
      });
      return res.status(200).json({
        data: updated,
        success: true,
        error: null,
      });
    } catch (error: any) {
      console.error("Error assigning order:", error);
      return res.status(500).json({
        data: null,
        success: false,
        error: error.message,
      });
    }
  },

  // PATCH /orders/:id/status
  updateOrderStatus: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body as { status: OrderStatus };
      const updated = await db.order.update({
        where: { id },
        data: { status },
      });
      return res.status(200).json({
        data: updated,
        success: true,
        error: null,
      });
    } catch (error: any) {
      console.error("Error updating order status:", error);
      return res.status(500).json({
        data: null,
        success: false,
        error: error.message,
      });
    }
  },
};
