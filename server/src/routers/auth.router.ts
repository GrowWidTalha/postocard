import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../lib/db";
import { UserRole } from "@prisma/client";
import { sendVerificationEmail } from "../lib/mail";
import { generateVerificationToken } from "../lib/tokens";
import { getUserByEmail, getUserById } from "../lib/data/user";
import * as bcrypt from "bcryptjs";
import { getVerificationTokenByToken } from "../lib/data/verification-token";

const authRouter = new Hono()
  .get(
    "/getUserByEmail/:email",
    zValidator("param", z.object({ email: z.string().email() })),
    async (c) => {
      try {
        const { email } = c.req.valid("param");
        const user = await getUserByEmail(email);

        if (!user) {
          return c.json(
            { status: "error", message: "User not found", data: null },
            404
          );
        }

        return c.json({
          status: "success",
          message: "User retrieved successfully",
          data: { user },
        });
      } catch (error) {
        return c.json(
          { status: "error", message: "Failed to retrieve user", error },
          500
        );
      }
    }
  )
  .get(
    "/getUserById/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const user = await getUserById(id);

        if (!user) {
          return c.json(
            { status: "error", message: "User not found", data: null },
            404
          );
        }

        return c.json({
          status: "success",
          message: "User retrieved successfully",
          data: { user },
        });
      } catch (error) {
        return c.json(
          { status: "error", message: "Failed to retrieve user", error },
          500
        );
      }
    }
  )
  .post(
    "/createUser",
    zValidator(
      "form",
      z.object({
        name: z.string(),
        email: z.string(),
        role: z.nativeEnum(UserRole),
        password: z.string().min(8, "Password must be at least 8 characters long"),
      })
    ),
    async (c) => {
      try {
        const { name, email, password, role } = c.req.valid("form");

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
          return c.json(
            { status: "error", message: "Email is already taken", data: null },
            400
          );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            role,
          },
        });

        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return c.json({
          status: "success",
          message: "User created successfully",
        });
      } catch (error) {
        return c.json(
          { status: "error", message: "Failed to create user", error },
          500
        );
      }
    }
  )
  .post(
    "/generateVerificationToken/:email",
    zValidator("param", z.object({ email: z.string().email() })),
    async (c) => {
      try {
        const { email } = c.req.valid("param");
        const verificationToken = await generateVerificationToken(email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return c.json({
          status: "success",
          message: "Verification token sent successfully",
        });
      } catch (error) {
        return c.json(
          { status: "error", message: "Failed to generate verification token", error },
          500
        );
      }
    }
  )
  .get(
    "/validateNewVerification/:token",
    zValidator("param", z.object({ token: z.string() })),
    async (c) => {
      try {
        const { token } = c.req.valid("param");
        const existingToken = await getVerificationTokenByToken(token);

        if (!existingToken) {
          return c.json(
            { status: "error", message: "Invalid or expired token", data: null },
            400
          );
        }

        const hasExpired = new Date(existingToken.expires) < new Date();
        if (hasExpired) {
          return c.json(
            { status: "error", message: "Token has expired", data: null },
            400
          );
        }

        const existingUser = await getUserByEmail(existingToken.email);
        if (!existingUser) {
          return c.json(
            { status: "error", message: "No user found for this email", data: null },
            404
          );
        }

        await db.user.update({
          where: { id: existingUser.id },
          data: { emailVerified: new Date() },
        });

        await db.verificationToken.delete({
          where: { id: existingToken.id },
        });

        return c.json({
          status: "success",
          message: "Email verified successfully",
        });
      } catch (error) {
        return c.json(
          { status: "error", message: "Failed to validate token", error },
          500
        );
      }
    }
  );

export default authRouter;
