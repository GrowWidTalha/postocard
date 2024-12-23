"use server";

import { db } from "@/db";

export const getCategories = async () => {
  try {
    const res = await db.designCategory.findMany();
    console.log(res);
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

export const createCategory = async (name: string) => {
  try {
    const res = await db.designCategory.create({
      data: { name: name },
    });

    return {
        success: true,
        data: res,
        error: null
    }
  } catch (error: any) {
    return {
        success: false,
        data: null,
        error: error.message
    }
  }
};
export const createSubCategory = async (name: string, id: string) => {
  try {
    const res = await db.subCategory.create({
      data: { name: name, designCategoryId: id},
    });

    return {
        success: true,
        data: res,
        error: null
    }
  } catch (error: any) {
    return {
        success: false,
        data: null,
        error: error.message
    }
  }
};

export const getSubCategoriesById = async (id: string) => {
    try {
        const res = await db.subCategory.findMany({ where: { designCategoryId: id}})
        console.log({res})
        return res
    } catch (error) {
        console.log(error)
    }
}
