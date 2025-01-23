"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import BlogForm from "./blog-form";
import { BlogFormData } from "../types/blog";
import { updateBlog } from "../actions/blogs.actions";
import { Blog } from "@prisma/client";

interface UpdateBlogFormProps {
  blog: Blog;
}

const UpdateBlogForm: React.FC<UpdateBlogFormProps> = ({ blog }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: BlogFormData) => {
      const res = await updateBlog({
        title: values.title,
        content: values.content,
        published: values.published,
        imageUrl: values.imageUrl,
        slug: values.slug,
        id: blog?.id!,
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.push("/blogs");
    },
  });

  return <BlogForm blog={blog} onSubmit={mutate} isPending={isPending} />;
};

export default UpdateBlogForm;
