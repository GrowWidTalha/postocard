import DashboardPage from "@/components/dashboard-page";
import React from "react";
import PrintingProviderContent from "./PrintingProvidersPageContent";
import { Button } from "@/components/ui/button";
import CreateUserModal from "@/features/peoples/components/createUserModal";
import { getUsersByRole } from "@/features/peoples/actions/people";
import EmptyState from "@/components/empty-state";

const ProvidersPage = async () => {
  const printProviders = await getUsersByRole("PRINTING_PROVIDER");
  return (
    <DashboardPage
      title=" Providers"
      cta={
        <CreateUserModal
          buttonLabel="Add Printing Providers"
          role="PRINTING_PROVIDER"
        />
      }
    >
      {printProviders && printProviders?.length < 1  ? (
        <EmptyState
          heading="No Printing Providers found"
          subHeading="No Printing Providers found. Create one now"
          action={
            <CreateUserModal
              buttonLabel="Add Printing Provider"
              role="PRINTING_PROVIDER"
            />
          }
        />
      ) : (
        <PrintingProviderContent printProviders={printProviders} />
      )}
    </DashboardPage>
  );
};

export default ProvidersPage;
