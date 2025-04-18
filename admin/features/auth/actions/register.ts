import * as z from "zod";
import { RegisterSchema } from "@/features/auth/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();
  return data;
};
