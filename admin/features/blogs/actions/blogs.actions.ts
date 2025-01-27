"use server";

import { db } from "@/db";

export const getAllBlogs = async () => {
  try {
    const blogs = await db.blog.findMany();

    return {
      data: blogs,
      error: null,
      success: true,
    };
  } catch (error: any) {
    console.error(error);

    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const getBlogById = async (id: string) => {
  try {
    const blog = await db.blog.findUnique({
      where: {
        id,
      },
    });

    return {
      data: blog,
      error: null,
      success: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const createBlog = async ({
  title,
  content,
  imageUrl,
  slug,
  author,
  published,
}: {
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  author: string;
  published: boolean;
}) => {
  try {
    const blog = await db.blog.create({
      data: {
        title,
        content,
        imageUrl,
        slug,
        author,
        published
      },
    });

    return {
      data: blog,
      error: null,
      success: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const updateBlog = async ({
  title,
  content,
  imageUrl,
  slug,
  published,
  id,
}: {
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  published: boolean;
  id: string;
}) => {
  try {
    const blog = await db.blog.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
        imageUrl,
        slug,
        published
      },
    });

    return {
      data: blog,
      error: null,
      success: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const blog = await db.blog.delete({
      where: {
        id,
      },
    });

    return {
      data: blog,
      error: null,
      success: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const publishBlog = async (id: string) => {
  try {
    const blog = await db.blog.update({
      where: {
        id,
      },
      data: {
        published: true,
      },
    });

    return {
      data: blog,
      error: null,
      success: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const unpublishBlog = async (id: string) => {
  try {
    const blog = await db.blog.update({
      where: {
        id,
      },
      data: {
        published: false,
      },
    });

    return {
      data: blog,
      error: null,
      success: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};
