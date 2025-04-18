import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth"; // optional protection

const router = Router();

// Get all users by role
router.get("/:role", userController.getUsersByRole);

// Delete user by ID
router.delete("/:id", userController.deleteUser);

// Create user by role
// @ts-ignore
router.post("/", userController.createUserByRole);

export default router;
