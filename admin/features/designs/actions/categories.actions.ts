"use server";

import { db } from "@/db";
import { DesignType } from "@prisma/client";

export const getCategories = async ({ type }: { type: DesignType }) => {
  try {
    const res = await db.designCategory.findMany({ where: { designType: type } });
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

export const createCategory = async (name: string, type: DesignType) => {
  try {
    const res = await db.designCategory.create({
      data: { name: name, designType: type},
    });

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
    const res = await db.subCategory.create({
      data: { name: name, designCategoryId: id },
    });

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
    const res = await db.subCategory.findMany({
      where: { designCategoryId: id },
    });
    console.log({ res });
    return res;
  } catch (error) {
    console.log(error);
  }
};
