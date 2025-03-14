"use server";

import { db } from "@/db";
import { UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { sendInvitationEmail } from "../lib/mail";
import { getUserByEmail } from "@/features/auth/data/user";

export const getUsersByRole = async (role: UserRole) => {
  try {
    const users = await db.user.findMany({
      where: {
        role: role,
      },
      include: {
        designs: true,
        orders: true,
        assignedOrders: true,
      },
    });

    return users;
  } catch (error) {
    console.error("Something went wrong fetching all users by role: ", error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const user = await db.user.delete({ where: { id: userId } });

    return {
      data: user,
      success: true,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      success: true,
      error: error.message,
    };
  }
};

export const createUserByRole = async ({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: UserRole;
}) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      const user = await db.user.create({
        data: {
          name: name,
          email: email,
          role: role,
          emailVerified: new Date(),
          isTwoFactorEnabled: true,
          password: hashedPassword,
        },
      });

      if (user) {
        await sendInvitationEmail(user?.email!, randomPassword, user.role);
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: user.id,
        },
      });

      return {
        success: true,
        data: user,
        error: null,
      };
    } else {
      return {
        data: null,
        error: "User with this email already exists. try a different email.",
        success: false,
      };
    }
  } catch (error: any) {
    console.error("Error creating user by role: ", error || "Unknown error");
    return {
      success: false,
      data: null,
      error: error?.message || "Unknown error",
    };
  }
};
