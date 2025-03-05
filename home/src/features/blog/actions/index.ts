"use server"

import { db } from "@/db";

export async function getBlogs() {
    try {
        const response = await db.blog.findMany({ where: { published: true } });
        return response;
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
}

export async function getBlogBySlug(slug: string) {
    try {
        const response = await db.blog.findFirst({ where: { slug: decodeURIComponent(slug)} });
        console.log("slug", slug)
        console.log(response)
        return response;
    } catch (error) {
        console.error("Error fetching blog by slug:", error);
        return null;
    }
}

