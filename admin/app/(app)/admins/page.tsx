import DashboardPage from "@/components/dashboard-page";
import React from "react";
import DesignerPageContent from "./AdminPageContent"
import { Button } from "@/components/ui/button";
import CreateUserModal from "@/features/peoples/components/createUserModal";
import { getUsersByRole } from "@/features/peoples/actions/people";
import EmptyState from "@/components/empty-state";

const DesignersPage = async () => {
    const designers = await getUsersByRole("ADMIN");
    return (
        <DashboardPage
            title="Admins"
            cta={<CreateUserModal buttonLabel="Add Admin" role="ADMIN" />}
        >
            {designers && designers?.data.length < 1 ? (
                <EmptyState
                    heading="No Admins found"
                    subHeading="No admins found. Create one now"
                    action={
                        <CreateUserModal buttonLabel="Add Admin" role="ADMIN" />
                    }
                />
            ) : (
                <DesignerPageContent
                    // @ts-ignore
                    designers={designers}

                />
            )}
        </DashboardPage>
    );
};

export default DesignersPage;
