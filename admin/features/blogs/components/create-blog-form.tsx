"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import BlogForm from "./blog-form";
import { BlogFormData } from "../types/blog";
import { createBlog } from "../actions/blogs.actions";

const CreateBlogForm: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: BlogFormData) => {
      const res = await createBlog({
        ...values,
        author: "Daniel", // You might want to get this from the user context
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.push("/blogs");
    },
  });

  return <BlogForm onSubmit={mutate} isPending={isPending} />;
};

export default CreateBlogForm;
