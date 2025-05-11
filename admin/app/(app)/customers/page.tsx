import DashboardPage from "@/components/dashboard-page";
import React from "react";
import CustomersPageContent from "./CostumersPageContent";
import { getUsersByRole } from "@/features/peoples/actions/people";
import EmptyState from "@/components/empty-state";

const CustomersPage = async () => {
    const customers = await getUsersByRole("USER");
    return (
        <DashboardPage title="Customers">
            {/* @ts-ignore */}
            {customers && customers?.length < 1 ? (
                <EmptyState heading="No Customers yet" subHeading="" />
            ) : (
                // @ts-ignore
                <CustomersPageContent customers={customers} />
            )}
        </DashboardPage>
    );
};

export default CustomersPage;
