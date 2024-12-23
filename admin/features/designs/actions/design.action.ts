"use server";

import { db } from "@/db";
import { currentUser } from "@/features/auth/lib/auth";

export const createDesign = async ({
  name,
  description,
  pdfLink,
  thumbnailUrl,
  subCategoryId,
  designCategoryId,
}: {
  name: string;
  description: string;
  pdfLink: string;
  thumbnailUrl: string;
  designCategoryId: string;
  subCategoryId: string;
}) => {
  try {
    const auth = await currentUser();
    if (!auth) return;
    const design = await db.design.create({
      data: {
        name: name,
        description: description,
        pdfLink: pdfLink,
        thumbnailUrl: thumbnailUrl,
        userId: auth?.id!,
        designCategoryId: designCategoryId,
        subCategoryId: subCategoryId,
      },
    });

    return {
      data: design,
      error: null,
      success: true,
    };
  } catch (error: any) {
    console.log("Error Creating design: ", error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const getAllDesigns = async () => {
  try {
    const designs = await db.design.findMany();

    return {
      data: designs,
      error: null,
      success: true,
    };
  } catch (error: any) {
    console.log("Error getting all designs: ", error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const getDesignById = async (id: string) => {
  try {
    const design = await db.design.findUnique({ where: { id: id } });
    return {
      data: design,
      error: null,
      success: true,
    };
  } catch (error: any) {
    console.log("Error fetching  design by id: ", error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};
