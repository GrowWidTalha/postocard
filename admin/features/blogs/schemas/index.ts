import { z } from "zod";

export const blogSchema = z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
    imageUrl: z.string().nonempty(),
    slug: z.string().nonempty(),
    published: z.boolean(),
})
