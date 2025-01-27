"use server";
import { db } from "@/db";
import { currentUser } from "@/features/auth/lib/auth";
import { Design, DesignType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type UpdateDesignInput = Omit<
  Design,
  "id" | "createdAt" | "updatedAt" | "userId" | "status"
>;

export async function updateDesign(id: string, data: UpdateDesignInput) {
  try {
    const updatedDesign = await db.design.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        designCategoryId: data.designCategoryId,
        subCategoryId: data.subCategoryId,
        pdfLink: data.pdfLink,
        thumbnailUrl: data.thumbnailUrl,
        designType: data.designType,
        published: data.published,
      },
    });

    return { data: updatedDesign, error: null, success: true };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating design:", error);
    }
    return { error: "Failed to update design. Please try again." };

  }
}

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
        createdBy: auth.role,
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
    // throw Error(error?.message);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const deleteDesign = async (id: string) => {
  try {
    const res = await db.design.delete({ where: { id } });
    return res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
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
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching  design by id: ", error);
    }

    return {
      data: null,
      error: "something went wrong.",
      success: false,
    };
  }
};
