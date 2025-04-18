import { Router } from "express";
import { blogController } from "../controllers/blog.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

// Get all designs
// @ts-ignore
router.get("/", blogController.getAllBlogs);

// Get a single blog by ID
// @ts-ignore
router.get("/:id", blogController.getBlogById);

// Create a new blog (protected route)
// @ts-ignore

router.post("/", blogController.createBlog);

// Update an existing blog (protected route)
// @ts-ignore

router.put("/:id", blogController.updateBlog);

// Delete a blog (protected route)
// @ts-ignore
router.delete("/:id", blogController.deleteBlog);

// Publish a blog (protected route)
// @ts-ignore
router.post("/:id/publish", blogController.publishBlog);

// Unpublish a blog (protected route)
// @ts-ignore
router.post("/:id/unpublish", blogController.unpublishBlog);

export default router;
