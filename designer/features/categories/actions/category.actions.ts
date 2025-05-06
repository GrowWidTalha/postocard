// "use server";

// import { db } from "@/db";
// import { DesignType } from "@prisma/client";
// export const deleteCategory = async (categoryId: string) => {
//   try {
//     // Delete all subcategories related to the category
//     await db.subCategory.deleteMany({
//       where: { designCategoryId: categoryId },
//     });

//     // Delete all designs related to the category
//     await db.design.deleteMany({
//       where: { designCategoryId: categoryId },
//     });

//     // Delete the category
//     const deletedCategory = await db.designCategory.delete({
//       where: { id: categoryId },
//     });
//     return deletedCategory;
//   } catch (error) {
//     console.error("Failed to delete category:", error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };

// export const deleteSubCategory = async (subCategoryId: string) => {
//   try {
//     // Delete all designs related to the subcategory
//     await db.design.deleteMany({
//       where: { subCategoryId: subCategoryId },
//     });

//     // Delete the subcategory
//     const deletedSubCategory = await db.subCategory.delete({
//       where: { id: subCategoryId },
//     });
//     return deletedSubCategory;
//   } catch (error) {
//     console.error("Failed to delete subcategory:", error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };




// export const createSubCategory = async (
//   name: string,
//   categoryId: string,
// ) => {
//   try {
//     const newSubCategory = await db.subCategory.create({
//       data: {
//         name: name,
//         designCategoryId: categoryId,
//       },
//     });
//     return newSubCategory;
//   } catch (error) {
//     console.error("Failed to create subcategory:", error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };



// export const getAllCategories = async () => {
//   try {
//     const categories = await db.designCategory.findMany({
//       include: {
//         designs: true,
//         subCategories: true,
//       },
//     });

//     return categories;
//   } catch (error) {}
// };
// export const getSubCategoriesByCategory = async (categoryId: string) => {
//   try {
//     const subCategories = await db.subCategory.findMany({
//       where: { designCategoryId: categoryId },
//       include: {
//           designs: true,
//       },
//     });

//     return subCategories;
//   } catch (error) {
//     console.error("Failed to get subcategories by category:", error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };

// export const createCategory = async (
//   name: string,
//   designType: DesignType
// ) => {
//   try {
//     const newCategory = await db.designCategory.create({
//       data: {
//         name: name,
//         designType: designType,
//       },
//     });
//     return newCategory;
//   } catch (error: any) {
//     console.error("Failed to create category:", error.stack);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };
import { DesignType } from "@prisma/client";
import { db } from "@/db";

// API versions of duplicated functions
export const getCategories = async (type?: DesignType) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?type=${type}`);
    const res = await response.json();
    return {
      data: res,
      error: null,
      success: true,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const createCategory = async (name: string, type: DesignType) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, type }),
    });
    const res = await response.json();

    return {
      success: true,
      data: res,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const createSubCategory = async (name: string, id: string, type: DesignType) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/subcategory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, id, type }),
    });
    const res = await response.json();

    return {
      success: true,
      data: res,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const getSubCategoriesById = async (id: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${id}/subcategories`);
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Non-duplicated functions from category.actions.ts
export const deleteCategory = async (categoryId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${categoryId}`,
        {
          method: "DELETE",
        }
      );
      const res = await response.json();

      return {
        success: true,
        data: res,
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };

  export const deleteSubCategory = async (subCategoryId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/subcategory/${subCategoryId}`,
        {
          method: "DELETE",
        }
      );
      const res = await response.json();
      return {
        success: true,
        data: res,
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  };
