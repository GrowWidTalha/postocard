import { Request, Response } from "express";
import { db } from "../db"; // Restored db import for other methods
import { DesignType } from "@prisma/client";
import { getSubCategoriesByCategoryNameService, getAllCategoriesService } from "../services/category.service"; // Combined imports

export const categoryController = {
    async getCategories(req: Request, res: Response) {
        try {
            const { type } = req.query;
            // Validate type if necessary, or ensure it matches DesignType enum
            const categories = await getAllCategoriesService(type as DesignType | undefined);

            res.status(200).json({
                data: categories,
                error: null,
                success: true,
            });
        } catch (error: any) {
            console.error("Error in getCategories controller:", error.message);
            res.status(500).json({
                data: null,
                // Provide a more generic error message to the client
                error: "Failed to fetch categories. Please try again later.",
                success: false,
            });
        }
    },

    async createCategory(req: Request, res: Response) {
        try {
            const { name, type } = req.body;
            const category = await db.designCategory.create({
                data: { name, designType: type },
            });

            res.status(201).json({
                success: true,
                data: category,
                error: null,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                data: null,
                error: error.message,
            });
        }
    },

    async createSubCategory(req: Request, res: Response) {
        try {
            const { name, id, type } = req.body;
            const subCategory = await db.subCategory.create({
                data: {
                    name,
                    designCategoryId: id,
                },
            });

            res.status(201).json({
                success: true,
                data: subCategory,
                error: null,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                data: null,
                error: error.message,
            });
        }
    },

    async getSubCategoriesById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const subCategories = await db.subCategory.findMany({
                where: { designCategoryId: id },
                include: {
                    designs: true,
                },
            });

            res.status(200).json(subCategories);
        } catch (error: any) {
            console.log(error);
            res.status(500).json({ error: "Failed to fetch subcategories" });
        }
    },
 // Delete a category and all its associated subcategories and designs in a single transaction
async deleteCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      // Run all deletions concurrently as an atomic transaction.
      const result = await db.$transaction([
        db.subCategory.deleteMany({
          where: { designCategoryId: categoryId },
        }),
        db.design.deleteMany({
          where: { designCategoryId: categoryId },
        }),
        db.designCategory.delete({
          where: { id: categoryId },
        }),
      ]);

      // result is an array with the results for each operation.
      res.status(200).json({
        success: true,
        data: result,
        error: null,
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: "Failed to delete category" });
    }
  },

  // Delete a subcategory and its associated designs in a single transaction
  async deleteSubCategory(req: Request, res: Response) {
    try {
      const { subCategoryId } = req.params;
      // Run both deletion queries concurrently as part of a transaction.
      const result = await db.$transaction([
        db.design.deleteMany({
          where: { subCategoryId },
        }),
        db.subCategory.delete({
          where: { id: subCategoryId },
        }),
      ]);

      res.status(200).json({
        success: true,
        data: result,
        error: null,
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: "Failed to delete subcategory" });
    }
  },

  async getSubCategoriesByCategoryNameController(req: Request, res: Response) {
    try {
      const { categoryName } = req.params;
      if (!categoryName) {
        return res.status(400).json({ message: 'Category name is required' });
      }
      const subCategories = await getSubCategoriesByCategoryNameService(categoryName);
      if (!subCategories || subCategories.length === 0) {
        return res.status(404).json({ message: 'No subcategories found for this category name' });
      }
      return res.status(200).json(subCategories);
    } catch (error: any) {
      console.error(
        "Error in getSubCategoriesByCategoryNameController:",
        error.message
      );
      if (error.message === 'Failed to fetch subcategories by category name') {
        return res.status(500).json({ message: 'Failed to fetch subcategories' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};
