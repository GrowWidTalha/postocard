"use server";
import { db } from "@/db";
import { currentUser } from "@/features/auth/lib/auth";
import { DesignType } from "@prisma/client";
import { z } from "zod";

const createDesignSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  pdfLink: z.string().url(),
  thumbnailUrl: z.string().url(),
  designCategoryId: z.string().nonempty(),
  subCategoryId: z.string().nonempty(),
  published: z.boolean(),
  type: z.nativeEnum(DesignType),
});

export const createDesign = async (
  params: z.infer<typeof createDesignSchema>
) => {
  try {
    const auth = await currentUser();
    if (!auth) return;

    // Validate params using Zod schema
    const validatedParams = createDesignSchema.safeParse(params);
    if (!validatedParams.success) return null;
    console.log({
      ...validatedParams,
      user: auth,
    });

    const design = await db.design.create({
      data: {
        name: validatedParams.data.name,
        description: validatedParams.data.description,
        pdfLink: validatedParams.data.pdfLink,
        thumbnailUrl: validatedParams.data.thumbnailUrl,
        designCategoryId: validatedParams.data.designCategoryId,
        subCategoryId: validatedParams.data.subCategoryId,
        published: validatedParams.data.published,
        designType: validatedParams.data.type,
        userId: auth.id!,
      },
    });

    return {
      data: design,
      error: null,
      success: true,
    };
  } catch (error: any) {
    throw Error(error?.message)
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
// console.log(designs)
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
