// "use server";

// import { db } from "@/db";
// import { UserRole } from "@prisma/client";
// import * as bcrypt from "bcryptjs";
// import { sendInvitationEmail } from "../lib/mail";
// import { getUserByEmail } from "@/features/auth/data/user";

// export const getUsersByRole = async (role: UserRole) => {
//   try {
//     const users = await db.user.findMany({
//       where: {
//         role: role,
//       },
//       include: {
//         designs: true,
//         orders: true,
//         assignedOrders: true,
//       },
//     });

//     return users;
//   } catch (error) {
//     console.error("Something went wrong fetching all users by role: ", error);
//   }
// };

// export const deleteUser = async (userId: string) => {
//   try {
//     const user = await db.user.delete({ where: { id: userId } });

//     return {
//       data: user,
//       success: true,
//       error: null,
//     };
//   } catch (error: any) {
//     return {
//       data: null,
//       success: true,
//       error: error.message,
//     };
//   }
// };

// export const createUserByRole = async ({
//   name,
//   email,
//   role,
// }: {
//   name: string;
//   email: string;
//   role: UserRole;
// }) => {
//   try {
//     const existingUser = await getUserByEmail(email);
//     if (!existingUser) {
//       const randomPassword = Math.random().toString(36).slice(-8);
//       const hashedPassword = await bcrypt.hash(randomPassword, 10);
//       const user = await db.user.create({
//         data: {
//           name: name,
//           email: email,
//           role: role,
//           emailVerified: new Date(),
//           isTwoFactorEnabled: true,
//           password: hashedPassword,
//         },
//       });

//       if (user) {
//         await sendInvitationEmail(user?.email!, randomPassword, user.role);
//       }

//       return {
//         success: true,
//         data: user,
//         error: null,
//       };
//     } else {
//       return {
//         data: null,
//         error: "User with this email already exists. try a different email.",
//         success: false,
//       };
//     }
//   } catch (error: any) {
//     console.error("Error creating user by role: ", error || "Unknown error");
//     return {
//       success: false,
//       data: null,
//       error: error?.message || "Unknown error",
//     };
//   }
// };

import { UserRole } from "@prisma/client";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/users";

export const getUsersByRole = async (role: UserRole) => {
  try {
    const res = await fetch(`${API_BASE}/${role}`);
    const data = await res.json();

    console.log(data)
    return {
      data: data.data,
      success: res.ok,
      error: data.error || null,
    };
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return {
      data: null,
      success: false,
      error: error.message,
    };
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    return {
      data: data.data,
      success: res.ok,
      error: data.error || null,
    };
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return {
      data: null,
      success: false,
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
    const res = await fetch(`${API_BASE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, role }),
    });

    const data = await res.json();

    return {
      data: data.data,
      success: res.ok,
      error: data.error || null,
    };
  } catch (error: any) {
    console.error("Error creating user:", error);
    return {
      data: null,
      success: false,
      error: error.message,
    };
  }
};
