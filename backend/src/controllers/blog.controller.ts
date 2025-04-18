import { Request, Response } from "express";
import { db } from "../db";
import { Blog } from "@prisma/client";

export const blogController = {
  // Get all blogs
  async getAllBlogs(req: Request, res: Response) {
    try {
      const blogs: Blog[] = await db.blog.findMany();
      return res.status(200).json({
        data: blogs,
        error: null,
        success: true,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        data: null,
        error: error.message,
        success: false,
      });
    }
  },

  // Get a single blog by ID
  async getBlogById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const blog: Blog | null = await db.blog.findUnique({
        where: { id },
      });

      return res.status(200).json({
        data: blog,
        error: null,
        success: true,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        data: null,
        error: error.message,
        success: false,
      });
    }
  },

  // Create a new blog
  async createBlog(req: Request, res: Response) {
    try {
      const { title, content, imageUrl, slug, author, published } = req.body;
      const blog: Blog = await db.blog.create({
        data: { title, content, imageUrl, slug, author, published },
      });

      return res.status(201).json({
        data: blog,
        error: null,
        success: true,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        data: null,
        error: error.message,
        success: false,
      });
    }
  },

  // Update an existing blog
  async updateBlog(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { title, content, imageUrl, slug, published } = req.body;
      const blog: Blog = await db.blog.update({
        where: { id },
        data: { title, content, imageUrl, slug, published },
      });

      return res.status(200).json({
        data: blog,
        error: null,
        success: true,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        data: null,
        error: error.message,
        success: false,
      });
    }
  },

  // Delete a blog
  async deleteBlog(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const blog: Blog = await db.blog.delete({
        where: { id },
      });

      return res.status(200).json({
        data: blog,
        error: null,
        success: true,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        data: null,
        error: error.message,
        success: false,
      });
    }
  },

  // Publish a blog
  async publishBlog(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const blog: Blog = await db.blog.update({
        where: { id },
        data: { published: true },
      });

      return res.status(200).json({
        data: blog,
        error: null,
        success: true,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        data: null,
        error: error.message,
        success: false,
      });
    }
  },

  // Unpublish a blog
  async unpublishBlog(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const blog: Blog = await db.blog.update({
        where: { id },
        data: { published: false },
      });

      return res.status(200).json({
        data: blog,
        error: null,
        success: true,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        data: null,
        error: error.message,
        success: false,
      });
    }
  },
};
