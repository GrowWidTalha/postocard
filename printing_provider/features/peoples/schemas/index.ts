import { UserRole } from "@prisma/client";
import { z } from "zod";

export const createUserFormSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    role: z.enum(["PRINTING_PROVIDER", "ADMIN", "USER", "DESIGNER"]),
})
