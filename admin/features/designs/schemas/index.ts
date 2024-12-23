import { z } from "zod";

export const designSchema = z.object({
  name: z.string().nonempty(),
  description: z.string(),
  pdfLink: z.string(),
  thumbnailUrl: z.string(),
  category: z.string(),
  subCategory: z.string(),
  published: z.boolean(),
});
