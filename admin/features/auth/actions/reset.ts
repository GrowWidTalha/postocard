import { z } from "zod";
import { ResetSchema } from "../schemas";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error };
      }

      return { success: data.message };
    } catch (error) {
      return { error: "Something went wrong" };
    }
  };
