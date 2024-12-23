import DashboardPage from "@/components/dashboard-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CardsPage = () => {
  return (
    <DashboardPage
      title="Designs"
      cta={
        <Button asChild>
          <Link href={"/designs/create"}>Add Design</Link>
        </Button>
      }
    >
      CardsPage
    </DashboardPage>
  );
};

export default CardsPage;
