"use server";

import { db } from "../../../../db";

export const getAllCategories = async () => {
  try {
    const categories = await db.designCategory.findMany();

    return categories;
  } catch (error) {
    console.log("Something went wrong error fetching categories", error);
  }
};
