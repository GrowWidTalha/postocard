import { Router } from 'express';
import type { RequestHandler } from 'express';
import { login, register, newVerification, reset, newPassword } from '../controllers/authController';
import { LoginSchema, RegisterSchema, NewPasswordSchema } from '../schemas';
import { z } from 'zod';
import { getUserById, getUserByEmail } from '../data/user';
import { getTwoFactorConfirmationByUserId } from '../data/two-factor-confirmation';
import { getAccountByUserId } from '../data/account';
import { db } from '../db';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const router = Router();

const loginHandler: RequestHandler = async (req, res, next) => {
    console.log("hello world")
  try {
    const result = await login(req.body);
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }
    if (result.success) {
      res.status(200).json({ message: result.success });
      return;
    }
    if (result.twoFactor) {
      res.status(200).json({ twoFactor: true });
      return;
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const registerHandler: RequestHandler = async (req, res, next) => {
  try {
    const result = await register(req.body);
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }
    if (result.success) {
      res.status(200).json({ message: result.success });
      return;
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const verificationHandler: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400).json({ error: "Token is required" });
      return;
    }

    const result = await newVerification(token);
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }
    res.status(200).json({ message: result.success });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const resetHandler: RequestHandler = async (req, res, next) => {
  try {
    const result = await reset(req.body);
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }
    res.status(200).json({ message: result.success });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const newPasswordHandler: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.query;
    const result = await newPassword(req.body, token as string);
    if (result.error) {
      res.status(400).json({ error: result.error });
      return;
    }
    res.status(200).json({ message: result.success });
  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const signInCallbackHandler: RequestHandler = async (req, res, next) => {
  try {
    const { user, account } = req.body;
    console.log("Starting signIn callback with:", { userId: user.id, provider: account?.provider });

    if (account?.provider !== "credentials") {
      console.log("Non-credentials provider, allowing sign in");
      res.status(200).json({ success: true });
      return;
    }

    console.log("Fetching existing user from database");
    const existingUser = await getUserById(user.id);
    console.log("Found user:", existingUser);

    if (!existingUser || !existingUser.emailVerified) {
      console.log("User validation failed:", { exists: !!existingUser, emailVerified: existingUser?.emailVerified });
      res.status(401).json({ error: "User not verified" });
      return;
    }

    if (existingUser.isTwoFactorEnabled) {
      console.log("2FA is enabled, checking for confirmation");
      const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      console.log("2FA confirmation status:", { exists: !!twoFactorConfirmation });

      if (!twoFactorConfirmation) {
        console.log("No 2FA confirmation found, denying access");
        res.status(401).json({ error: "2FA confirmation required" });
        return;
      }

      console.log("Deleting used 2FA confirmation");
      await db.twoFactorConfirmation.delete({
        where: { id: twoFactorConfirmation.id },
      });
    }

    await db.twoFactorConfirmation.upsert({
      where: {
        userId: user.id
      },
      create: {
        userId: user.id
      },
      update: {} // No updates needed, just ensure record exists
    });

    console.log("All checks passed, allowing sign in");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Sign in callback error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const linkAccountHandler: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Link account error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const sessionHandler: RequestHandler = async (req, res, next) => {
  try {
    const { token, session } = req.body;
    const updatedSession = { ...session };

    if (token.sub && updatedSession.user) {
      updatedSession.user.id = token.sub;
    }

    if (token.role && updatedSession.user) {
      updatedSession.user.role = token.role as UserRole;
    }

    if (updatedSession.user) {
      updatedSession.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
    }

    if (updatedSession.user) {
      updatedSession.user.name = token.name;
      updatedSession.user.email = token.email ?? '';
      updatedSession.user.isOAuth = token.isOAuth as boolean;
    }

    res.status(200).json({ session: updatedSession });
  } catch (error) {
    console.error('Session handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const jwtHandler: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token.sub) {
      res.status(200).json({ token });
      return;
    }

    const existingUser = await getUserById(token.sub);
    if (!existingUser) {
      res.status(200).json({ token });
      return;
    }

    const existingAccount = await getAccountByUserId(existingUser.id);

    const updatedToken = {
      ...token,
      isOAuth: !!existingAccount,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      isTwoFactorEnabled: existingUser.isTwoFactorEnabled,
    };

    res.status(200).json({ token: updatedToken });
  } catch (error) {
    console.error('JWT handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const authorizeHandler: RequestHandler = async (req, res, next) => {
  try {
    const credentials = req.body;
    console.log("Starting authorize with credentials:", { ...credentials, password: "[REDACTED]" });

    const validatedFields = LoginSchema.safeParse(credentials);
    console.log("Field validation result:", validatedFields);

    if (!validatedFields.success) {
      console.log("Validation failed, returning null");
      res.status(401).json({ user: null });
      return;
    }

    const { email, password } = validatedFields.data;
    console.log("Attempting to find user with email:", email);

    const user = await getUserByEmail(email);
    console.log("Found user:", { ...user, password: "[REDACTED]" });

    if (!user || !user.password) {
      console.log("User validation failed:", { exists: !!user, hasPassword: !!user?.password });
      res.status(401).json({ user: null });
      return;
    }

    console.log("Comparing passwords");
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", passwordMatch);

    if (passwordMatch) {
      console.log("Password matched, returning user");
      // Remove sensitive data before sending
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json({ user: userWithoutPassword });
      return;
    }

    console.log("Authorization failed, returning null");
    res.status(401).json({ user: null });
  } catch (error) {
    console.error('Authorize error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

router.post('/login', loginHandler);
router.post('/register', registerHandler);
router.post('/new-verification', verificationHandler);
router.post('/reset', resetHandler);
router.post('/new-password', newPasswordHandler);
router.post('/signin-callback', signInCallbackHandler);
router.post('/link-account', linkAccountHandler);
router.post('/session', sessionHandler);
router.post('/jwt', jwtHandler);
router.post('/authorize', authorizeHandler);

export default router;
