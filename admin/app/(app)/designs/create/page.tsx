import DashboardPage from "@/components/dashboard-page";
import { Button } from "@/components/ui/button";
import CreateDesignForm from "@/features/designs/components/createDesignForm";
import Link from "next/link";
import React from "react";

const CreateCardsPage = () => {
  return (
    <DashboardPage title="Add Design">
      <CreateDesignForm type="create" />
    </DashboardPage>
  );
};

export default CreateCardsPage;
