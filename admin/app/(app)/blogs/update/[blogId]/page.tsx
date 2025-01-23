import DashboardPage from "@/components/dashboard-page";
import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogById } from "@/features/blogs/actions/blogs.actions";
import UpdateBlogForm from "@/features/blogs/components/update-blog-form";
import React from "react";

const CreateBlogPage = async({params}: { params: Promise<{ blogId: string }> }) => {
    const {blogId} = await params
    const blog = await getBlogById(blogId)

  return (
    <DashboardPage title="Create Blog">
        {!blog.data ? (
            <EmptyState
                heading="Blog Not found"
                subHeading=""
                action={<Button variant={"outline"}>Go Back</Button>}
                />
        ) : (
            <Card>
              <CardContent className="py-4">
                <UpdateBlogForm blog={blog?.data!} />
              </CardContent>
            </Card>
        )}
    </DashboardPage>
  );
};

export default CreateBlogPage;
