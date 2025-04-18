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
