import DashboardPage from "@/components/dashboard-page";
import { Button } from "@/components/ui/button";
import DesignForm from "@/features/designs/components/createDesignForm";
import Link from "next/link";
import React from "react";

const CreateCardsPage = () => {
  return (
    <DashboardPage title="Add Design">
      <DesignForm type="create" />
    </DashboardPage>
  );
};

export default CreateCardsPage;
