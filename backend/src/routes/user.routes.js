"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// Get all users by role
router.get("/:role", user_controller_1.userController.getUsersByRole);
// Delete user by ID
router.delete("/:id", user_controller_1.userController.deleteUser);
// Create user by role
// @ts-ignore
router.post("/", user_controller_1.userController.createUserByRole);
exports.default = router;
