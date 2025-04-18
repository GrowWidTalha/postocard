import { Router } from "express";
import { categoryController } from "../controllers/category.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

// Get categories by type
router.get("/", categoryController.getCategories);

// Create category (protected route)
router.post("/", categoryController.createCategory);

// Create subcategory (protected route)
router.post("/subcategory", categoryController.createSubCategory);

// Get subcategories by category ID
router.get("/:id/subcategories", categoryController.getSubCategoriesById);

// Delete category by ID (protected route)
router.delete("/:categoryId", categoryController.deleteCategory);

// Delete subcategory by ID (protected route)
router.delete("/subcategory/:subCategoryId", categoryController.deleteSubCategory);

export default router;
