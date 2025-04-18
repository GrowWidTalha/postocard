import DashboardPage from "@/components/dashboard-page";
import React from "react";
import BlogsPageContent from "./BlogsPageContent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllBlogs } from "@/features/blogs/actions/blogs.actions";
import { Spinner } from "@/components/spinner";
import EmptyState from "@/components/empty-state";

const BlogsPage = async () => {
  const blogs = await getAllBlogs();

  console.log(blogs)

  if (!blogs)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner size={"large"} />
      </div>
    );
  return (
    <DashboardPage
      title="Blogs"
      cta={
        <Link href={"/blogs/create"}>
          <Button>Create Post</Button>
        </Link>
      }
    >
        <BlogsPageContent blogs={blogs.data!} />
    </DashboardPage>
  );
};

export default BlogsPage;
