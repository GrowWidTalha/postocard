import DashboardPage from "@/components/dashboard-page";
import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogById } from "@/features/blogs/actions/blogs.actions";
import UpdateBlogForm from "@/features/blogs/components/update-blog-form";
import { getDesignById } from "@/features/designs/actions/design.action";
import {DesignForm} from "@/features/designs/components/createDesignForm";
import React from "react";

const CreateBlogPage = async({params}: { params: Promise<{ designId: string }> }) => {
    const {designId} = await params
    const existingDesign = await getDesignById(designId)

  return (
    <DashboardPage title="Update Design">
        {!existingDesign.data ? (
            <EmptyState
                heading="Design Not found"
                subHeading=""
                action={<Button variant={"outline"}>Go Back</Button>}
                />
        ) : (
            <Card>
              <CardContent className="py-4">
              <DesignForm  type="update" design={existingDesign.data} />
              </CardContent>
            </Card>
        )}
    </DashboardPage>
  );
};

export default CreateBlogPage;
