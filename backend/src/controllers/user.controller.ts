import { Request, Response } from "express";
import { UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { getUserByEmail } from "../data/user";
import { db } from "../db";
import { sendInvitationEmail } from "../lib/mail";
export const userController = {
  getUsersByRole: async (req: Request, res: Response) => {
    try {
      const { role } = req.params;

      const users = await db.user.findMany({
        where: { role: role as UserRole },
        include: {
          designs: true,
          orders: true,
          assignedOrders: true,
        },
      });

      res.status(200).json({ data: users, success: true });
    } catch (error) {
      console.error("Error fetching users by role:", error);
      res.status(500).json({ data: null, success: false, error: error });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await db.user.delete({ where: { id } });
      res.status(200).json({ data: user, success: true, error: null });
    } catch (error: any) {
      res.status(500).json({ data: null, success: false, error: error.message });
    }
  },

  createUserByRole: async (req: Request, res: Response) => {
    try {
      const { name, email, role } = req.body;

      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          data: null,
          success: false,
          error: "User with this email already exists.",
        });
      }

      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      console.log(randomPassword)

      const user = await db.user.create({
        data: {
          name,
          email,
          role,
          emailVerified: new Date(),
          isTwoFactorEnabled: true,
          password: hashedPassword,
        },
      });

      await db.twoFactorConfirmation.create({ data: { userId: user.id } });
      await sendInvitationEmail(email, randomPassword, role);

      res.status(201).json({ success: true, data: user, error: null });
    } catch (error: any) {
      console.error("Error creating user by role:", error);
      res.status(500).json({
        success: false,
        data: null,
        error: error?.message || "Unknown error",
      });
    }
  },
};
