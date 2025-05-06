"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = void 0;
const db_1 = require("../db");
exports.blogController = {
    // Get all blogs
    getAllBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield db_1.db.blog.findMany();
                return res.status(200).json({
                    data: blogs,
                    error: null,
                    success: true,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    data: null,
                    error: error.message,
                    success: false,
                });
            }
        });
    },
    // Get a single blog by ID
    getBlogById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const blog = yield db_1.db.blog.findUnique({
                    where: { id },
                });
                return res.status(200).json({
                    data: blog,
                    error: null,
                    success: true,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    data: null,
                    error: error.message,
                    success: false,
                });
            }
        });
    },
    // Create a new blog
    createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, imageUrl, slug, author, published } = req.body;
                const blog = yield db_1.db.blog.create({
                    data: { title, content, imageUrl, slug, author, published },
                });
                return res.status(201).json({
                    data: blog,
                    error: null,
                    success: true,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    data: null,
                    error: error.message,
                    success: false,
                });
            }
        });
    },
    // Update an existing blog
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const { title, content, imageUrl, slug, published } = req.body;
                const blog = yield db_1.db.blog.update({
                    where: { id },
                    data: { title, content, imageUrl, slug, published },
                });
                return res.status(200).json({
                    data: blog,
                    error: null,
                    success: true,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    data: null,
                    error: error.message,
                    success: false,
                });
            }
        });
    },
    // Delete a blog
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const blog = yield db_1.db.blog.delete({
                    where: { id },
                });
                return res.status(200).json({
                    data: blog,
                    error: null,
                    success: true,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    data: null,
                    error: error.message,
                    success: false,
                });
            }
        });
    },
    // Publish a blog
    publishBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const blog = yield db_1.db.blog.update({
                    where: { id },
                    data: { published: true },
                });
                return res.status(200).json({
                    data: blog,
                    error: null,
                    success: true,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    data: null,
                    error: error.message,
                    success: false,
                });
            }
        });
    },
    // Unpublish a blog
    unpublishBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const blog = yield db_1.db.blog.update({
                    where: { id },
                    data: { published: false },
                });
                return res.status(200).json({
                    data: blog,
                    error: null,
                    success: true,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    data: null,
                    error: error.message,
                    success: false,
                });
            }
        });
    },
};
