// "use server";
// import { db } from "@/db";
// import { currentUser } from "@/features/auth/lib/auth";
// import { Design, DesignType } from "@prisma/client";
// import { z } from "zod";

// type UpdateDesignInput = Design

// export async function updateDesign(id: string, data: UpdateDesignInput) {
//   try {
//     const updatedDesign = await db.design.update({
//       where: { id },
//       data: {
//         name: data.name,
//         description: data.description,
//         designCategoryId: data.designCategoryId,
//         subCategoryId: data.subCategoryId,
//         pdfLink: data.pdfLink,
//         pdfUploadId: data.pdfUploadId, // NEW: UploadThing PDF file ID
//         thumbnailUrl: data.thumbnailUrl,
//         thumbnailUploadId: data.thumbnailUploadId, // NEW: UploadThing thumbnail file ID
//         designType: data.designType,
//         published: data.published,
//       },
//     });

//     return { data: updatedDesign, error: null, success: true };
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error updating design:", error);
//     }
//     return { error: "Failed to update design. Please try again." };
//   }
// }

// const createDesignSchema = z.object({
//   name: z.string().nonempty(),
//   description: z.string().nonempty(),
//   pdfLink: z.string().url(),
//   pdfUploadId: z.string().nonempty(), // NEW
//   thumbnailUrl: z.string().url(),
//   thumbnailUploadId: z.string().nonempty(), // NEW
//   designCategoryId: z.string().nonempty(),
//   subCategoryId: z.string().nonempty(),
//   published: z.boolean(),
//   type: z.nativeEnum(DesignType),
// });

// export const createDesign = async (
//   params: z.infer<typeof createDesignSchema>
// ) => {
//   try {
//     const auth = await currentUser();
//     if (!auth) return;

//     // Validate params using Zod schema
//     const validatedParams = createDesignSchema.safeParse(params);
//     if (!validatedParams.success) return null;

//     const design = await db.design.create({
//       data: {
//         name: validatedParams.data.name,
//         description: validatedParams.data.description,
//         pdfLink: validatedParams.data.pdfLink,
//         pdfUploadId: validatedParams.data.pdfUploadId, // NEW
//         createdBy: auth.name!,
//         thumbnailUrl: validatedParams.data.thumbnailUrl,
//         thumbnailUploadId: validatedParams.data.thumbnailUploadId, // NEW
//         designCategoryId: validatedParams.data.designCategoryId,
//         subCategoryId: validatedParams.data.subCategoryId,
//         published: validatedParams.data.published,
//         designType: validatedParams.data.type,
//         userId: auth.id!,
//       },
//     });

//     return {
//       data: design,
//       error: null,
//       success: true,
//     };
//   } catch (error: any) {
//     return {
//       data: null,
//       error: error.message,
//       success: false,
//     };
//   }
// };

// export const deleteDesign = async (id: string) => {
//   try {
//     const res = await db.design.delete({ where: { id } });
//     return res;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message);
//     }
//   }
// };

// export const getAllDesigns = async () => {
//   try {
//     const user = await currentUser()
//     if(!user) return;
//     const designs = await db.design.findMany({
//         where: { userId: user.id },
//       include: { user: true, designCategory: true, subCategory: true },
//     });
//     return {
//       data: designs,
//       error: null,
//       success: true,
//     };
//   } catch (error: any) {
//     console.log("Error getting all designs: ", error);
//     return {
//       data: null,
//       error: error.message,
//       success: false,
//     };
//   }
// };

// export const getDesignById = async (id: string) => {
//   try {
//     const design = await db.design.findUnique({ where: { id } });
//     return {
//       data: design,
//       error: null,
//       success: true,
//     };
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log("Error fetching design by id: ", error);
//     }
//     return {
//       data: null,
//       error: "Something went wrong.",
//       success: false,
//     };
//   }
// };


// Update design
export async function updateDesign(id: string, data: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/designs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Create design
export async function createDesign(data: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/designs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),

  });
  return response.json();
}

// Delete design
export async function deleteDesign(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/designs/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

// Get all designs
export async function getAllDesigns() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/designs`);
  return response.json();
}

// Get design by ID
export async function getDesignById(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/designs/${id}`);
  return response.json();
}
