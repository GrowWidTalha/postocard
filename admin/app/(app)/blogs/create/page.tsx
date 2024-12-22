import DashboardPage from "@/components/dashboard-page";
import { Card, CardContent } from "@/components/ui/card";
import CreateBlogForm from "@/features/blogs/components/createBlogForm";
import React from "react";

const CreateBlogPage = () => {
  return (
    <DashboardPage title="Create Blog">
      <Card>
        <CardContent className="py-4">
          <CreateBlogForm />
        </CardContent>
      </Card>
    </DashboardPage>
  );
};

export default CreateBlogPage;
