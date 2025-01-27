import { Blog } from "@prisma/client";
import { z } from "zod";

export const blogSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().url("Invalid image URL"),
  slug: z.string().min(1, "Slug is required"),
  published: z.boolean(),
});

export type BlogFormData = z.infer<typeof blogSchema>;

export interface BlogFormProps {
  blog?: Blog;
  onSubmit: (data: BlogFormData) => void;
  isPending: boolean;
}
