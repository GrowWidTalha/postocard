// "use server";
// import * as z from "zod";
// import bcrypt from "bcryptjs";


// import { RegisterSchema } from "../schemas";
// import { getUserByEmail } from "../data/user";
// import { generateVerificationToken } from "../lib/tokens";
// import { sendVerificationEmail } from "../lib/mail";
// import { db } from "../../../db";
// export const register = async (values: z.infer<typeof RegisterSchema>) => {
//   const validatedFields = RegisterSchema.safeParse(values);
//   if (!validatedFields.success) {
//     return { error: "Invalid fields" };
//   }

//   const { name, email, password } = validatedFields.data;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const existingUser = await getUserByEmail(email);
//   if (existingUser) {
//     return { error: "Email already taken." };
//   }

//   await db.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//     },
//   });

//   //   TODO: Send verification token email
//   const verificationtoken = await generateVerificationToken(email);
//   await sendVerificationEmail(
//     verificationtoken.email,
//     verificationtoken.token,
//   );
//   return { success: "Confirmation email sent!" };
// };
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
