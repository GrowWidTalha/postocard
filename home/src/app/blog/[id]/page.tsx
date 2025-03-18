"use client";

import { getBlogBySlug } from "@/features/blog/actions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import parse from 'html-react-parser';

const Page = () => {
    const { id } = useParams();
    const { data: blog, isLoading, error } = useQuery({
        queryKey: ["blog", id],
        queryFn: () => getBlogBySlug(id as string),
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-red-500">Error loading blog post</div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row">
                    {/* Image Section - Fixed on large screens */}
                    <div className="w-full lg:w-1/2 lg:sticky lg:top-0">
                        <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
                            <img
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                src={blog?.imageUrl || "https://via.placeholder.com/600x400"}
                                alt={blog?.title || "Blog Image"}
                            />
                        </div>
                    </div>

                    {/* Content Section - Scrollable */}
                    <div className="w-full lg:w-1/2 p-6 lg:p-8 lg:overflow-y-auto">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            {blog?.title}
                        </h1>
                        <div className="prose prose-lg max-w-none text-gray-600">
                            {blog?.content && parse(blog.content)}
                        </div>
                        <div className="mt-6 flex items-center text-sm text-gray-500">
                            <span>By {blog?.author}</span>
                            <span className="mx-2">•</span>
                            <span>{blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "No date available"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
