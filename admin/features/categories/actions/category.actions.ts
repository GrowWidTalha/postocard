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
