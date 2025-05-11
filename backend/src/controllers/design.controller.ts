import { Request, Response } from "express";
import { db } from "../db";
import { Design, DesignType } from "@prisma/client";
import { z } from "zod";
import { getDesignsBySubCategoryService } from "../services/design.service"; // Adjust path if necessary

const createDesignSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  pdfLink: z.string().url(),
  pdfUploadId: z.string().nonempty(),
  thumbnailUrl: z.string().url(),
  thumbnailUploadId: z.string().nonempty(),
  designCategoryId: z.string().nonempty(),
  subCategoryId: z.string().nonempty(),
  published: z.boolean(),
  type: z.nativeEnum(DesignType),
});

export const designController = {
  async updateDesign(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedDesign = await db.design.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          designCategoryId: data.designCategoryId,
          subCategoryId: data.subCategoryId,
          pdfLink: data.pdfLink,
          pdfUploadId: data.pdfUploadId,
          thumbnailUrl: data.thumbnailUrl,
          thumbnailUploadId: data.thumbnailUploadId,
          designType: data.designType,
          published: data.published,
          status: data.status
        },
      });

      res.status(200).json({ data: updatedDesign, error: null, success: true });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating design:", error);
      }
      res.status(500).json({ error: "Failed to update design. Please try again." });
    }
  },

  async createDesign(req: Request, res: Response) {
    try {
      const validatedParams = createDesignSchema.safeParse(req.body);
      if (!validatedParams.success) {
        res.status(400).json({ error: "Invalid input data" });
        return;
      }

      const design = await db.design.create({
        data: {
          name: validatedParams.data.name,
          description: validatedParams.data.description,
          pdfLink: validatedParams.data.pdfLink,
          pdfUploadId: validatedParams.data.pdfUploadId,
          thumbnailUrl: validatedParams.data.thumbnailUrl,
          thumbnailUploadId: validatedParams.data.thumbnailUploadId,
          designCategoryId: validatedParams.data.designCategoryId,
          subCategoryId: validatedParams.data.subCategoryId,
          published: validatedParams.data.published,
          designType: validatedParams.data.type,
          userId: req.body.user?.id!,
          createdBy: req.body.user?.name || "Unknown",
        },
      });

      res.status(201).json({
        data: design,
        error: null,
        success: true,
      });
    } catch (error: any) {
      res.status(500).json({
        data: null,
        error: error.message,
        success: false,
      });
    }
  },


  async deleteDesign(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await db.design.delete({ where: { id } });
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      res.status(500).json({ error: "Failed to delete design" });
    }
  },

  async getAllDesigns(req: Request, res: Response) {
    try {
      const designs = await db.design.findMany({
        include: { user: true, designCategory: true, subCategory: true },
      });
      res.status(200).json({
        data: designs,
        error: null,
        success: true,
      });
    } catch (error: any) {
      console.log("Error getting all designs: ", error);
      res.status(500).json({
        data: null,
        error: error.message,
        success: false,
      });
    }
  },

  async getDesignById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const design = await db.design.findUnique({ where: { id } });
      res.status(200).json({
        data: design,
        error: null,
        success: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error fetching design by id: ", error);
      }
      res.status(500).json({
        data: null,
        error: "Something went wrong.",
        success: false,
      });
    }
  },

  async getDesignsBySubCategory(req: Request, res: Response) {
    try {
      const { subCategoryId } = req.params;
      if (!subCategoryId) {
        return res.status(400).json({ message: 'Subcategory ID is required' });
      }
      const designs = await getDesignsBySubCategoryService(subCategoryId);
      if (!designs || designs.length === 0) {
        return res.status(404).json({ message: 'No designs found for this subcategory' });
      }
      return res.status(200).json(designs);
    } catch (error: any) {
      console.error(
        "Error in getDesignsBySubCategoryController:",
        error.message
      );
      // Check if the error is a known type or has a specific status code
      if (error.message === 'Failed to fetch designs by subcategory') {
        return res.status(500).json({ message: 'Failed to fetch designs' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};
