
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
    <div className="min-h-screen w-full p-4 py-2 bg-white rounded-lg shadow-lg">
      <div className="text-center py-3 border-b border-gray-300">
        <h1 className="text-4xl mt-2 font-serif font-semibold pt-1">{blog?.title}</h1>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap gap-4 py-4">
        <img
          className="w-full lg:w-3/12 h-full object-cover rounded-md"
          src={blog?.imageUrl || "https://via.placeholder.com/600x400"}
          alt={blog?.title || "Blog Image"}
        />

        <div className="flex-1 p-4">
          <div className="text-gray-700 px-2">
            {blog?.content && parse(blog.content)}
          </div>
          <div className="flex justify-between items-center mt-6 text-gray-500">
            <span>By {blog?.author}</span>
            <span className="">•</span>
            <span>{blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "No date available"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

