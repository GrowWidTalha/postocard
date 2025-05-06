// "use server";

// import { z } from "zod";
// import { ResetSchema } from "@/features/auth/schemas";
// import { getUserByEmail } from "../data/user";
// import { generatePasswordResetToken } from "../lib/tokens";
// import { sendPasswordResetToken, sendVerificationEmail } from "../lib/mail";

// export const reset = async (values: z.infer<typeof ResetSchema>) => {
//   const validatedFields = ResetSchema.safeParse(values);
//   if (!validatedFields.success) {
//     return { error: "Invalid Email!" };
//   }

//   const { email } = validatedFields.data;
//   const existingUser = await getUserByEmail(email);

//   if (!existingUser) {
//     return { error: "Email not found." };
//   }

//   const passwordResetToken = await generatePasswordResetToken(email);
//   await sendPasswordResetToken(
//     passwordResetToken.email,
//     passwordResetToken.token
//   );

//   return { success: "Reset email sent." };
// };

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
