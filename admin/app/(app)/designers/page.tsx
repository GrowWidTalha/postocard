import DashboardPage from "@/components/dashboard-page";
import React from "react";
import DesignerPageContent from "./DesignerPageContent";
import { Button } from "@/components/ui/button";
import CreateUserModal from "@/features/peoples/components/createUserModal";
import { getUsersByRole } from "@/features/peoples/actions/people";
import EmptyState from "@/components/empty-state";

const DesignersPage = async () => {
  const designers = await getUsersByRole("DESIGNER");
  return (
    <DashboardPage
      title="Designers"
      cta={<CreateUserModal buttonLabel="Add Designer" role="DESIGNER" />}
    >
      {designers && designers?.length < 1  ? (
        <EmptyState
          heading="No Designers found"
          subHeading="No designers found. Create one now"
          action={
            <CreateUserModal buttonLabel="Add Designer" role="DESIGNER" />
          }
        />
      ) : (
        <DesignerPageContent
         designers={designers}

         />
      )}
    </DashboardPage>
  );
};

export default DesignersPage;
