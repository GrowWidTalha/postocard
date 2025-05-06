"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("../controllers/blog.controller");
const router = (0, express_1.Router)();
// Get all designs
// @ts-ignore
router.get("/", blog_controller_1.blogController.getAllBlogs);
// Get a single blog by ID
// @ts-ignore
router.get("/:id", blog_controller_1.blogController.getBlogById);
// Create a new blog (protected route)
// @ts-ignore
router.post("/", blog_controller_1.blogController.createBlog);
// Update an existing blog (protected route)
// @ts-ignore
router.put("/:id", blog_controller_1.blogController.updateBlog);
// Delete a blog (protected route)
// @ts-ignore
router.delete("/:id", blog_controller_1.blogController.deleteBlog);
// Publish a blog (protected route)
// @ts-ignore
router.post("/:id/publish", blog_controller_1.blogController.publishBlog);
// Unpublish a blog (protected route)
// @ts-ignore
router.post("/:id/unpublish", blog_controller_1.blogController.unpublishBlog);
exports.default = router;
