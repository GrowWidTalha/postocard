"use client";
import EmptyState from "@/components/empty-state";
import { Spinner } from "@/components/spinner";
import { getAllBlogs } from "@/features/blogs/actions/blogs.actions";
import BlogPostCard from "@/features/blogs/components/blog-post-card";
import { Blog } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BlogsPageContent = ({ blogs }: { blogs: Blog[] }) => {
  const { data, isFetching } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await getAllBlogs();
      return res.data;
    },
    refetchOnWindowFocus: false,
    initialData: blogs,
  });

  return (
    <>
      {isFetching ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner size={"large"} className="text-primary" />
        </div>
      ) : (
        <>
          {data && data.length === 0 ? (
            <EmptyState
              heading="No blogs found"
              subHeading="Create a new blog post to get started"
              action={
                <Link href="/blogs/create">
                  <Button>Create Post</Button>
                </Link>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.map((blog) => (
                <BlogPostCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BlogsPageContent;
