"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const router = (0, express_1.Router)();
// Get categories by type
router.get("/", category_controller_1.categoryController.getCategories);
// Create category (protected route)
router.post("/", category_controller_1.categoryController.createCategory);
// Create subcategory (protected route)
router.post("/subcategory", category_controller_1.categoryController.createSubCategory);
// Get subcategories by category ID
router.get("/:id/subcategories", category_controller_1.categoryController.getSubCategoriesById);
// Delete category by ID (protected route)
router.delete("/:categoryId", category_controller_1.categoryController.deleteCategory);
// Delete subcategory by ID (protected route)
router.delete("/subcategory/:subCategoryId", category_controller_1.categoryController.deleteSubCategory);
exports.default = router;
