// "use server";

// import { db } from "../../../db";

// export const getAllCategories = async () => {
//   try {
//     const categories = await db.designCategory.findMany();

//     return categories;
//   } catch (error) {
//     console.log("Something went wrong error fetching categories", error);
//   }
// };

// export const getSubCategoriesByCategoryName = async (name: string) => {
//   try {
//     const subCategories = await db.subCategory.findMany({
//       where: { designCategory: { name: name } },
//     });

//     return subCategories;
//   } catch (error) {
//     console.log("Something went wrong error fetching subcategories", error);
//   }
// };

// export const getDesignsBySubCategory = async (subCategoryId: string) => {
//   try {
//     const designs = await db.design.findMany({
//       where: { subCategory: { name: subCategoryId } },
//     });

//     return designs;
//   } catch (error: any) {
//     console.log(
//       "Something went wrong error fetching designs by subcategory",
//       error.stack
//     );
//   }
// };

// export const getDesignById = async (id: string) => {
//   try {
//     const design = await db.design.findFirst({
//       where: { id: id, published: true },
//     });

//     return design
//   } catch (error: any) {
//     console.log("Something went wrong fetching design: ", error.stack)
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

