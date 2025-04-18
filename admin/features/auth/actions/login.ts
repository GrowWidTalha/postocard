import * as z from "zod";
import { LoginSchema } from "@/features/auth/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("[LOGIN-ACTION] Backend error:", data.error);
      return { error: data.error || "Something went wrong" };
    }

    if (data.twoFactor) {
      return { twoFactor: true };
    }

    return { success: data.message || "Login successful" };

  } catch (error) {
    console.error("[LOGIN-ACTION] Unexpected error:", error);
    return { error: "Something went wrong" };
  }
};
