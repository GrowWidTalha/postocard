import DashboardPage from "@/components/dashboard-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import DesignPageContent from "./design-page-content";
import { getAllDesigns } from "@/features/designs/actions/design.action";
import { Spinner } from "@/components/spinner";
import EmptyState from "@/components/empty-state";

const CardsPage = async () => {
    const designs = await getAllDesigns()
    if (!designs.data) {
        return <div className="flex items-center justify-center h-screen w-full"><Spinner size={"large"} className="text-primary" /></div>
    }
    return (
        <DashboardPage
            title="Designs"
            cta={
                <Button asChild>
                    <Link href={"/designs/create"}>Add Design</Link>
                </Button>
            }
        >
            {designs.data.length === 0 ? (
                <EmptyState
                    heading="No Designs found"
                    subHeading="There are no designs yet. Create one now"
                    action={<Button asChild>
                        <Link href={"/designs/create"}>Add Design</Link>
                    </Button>}
                />
            ) : (
                <DesignPageContent initialDesigns={designs.data} />
            )}
        </DashboardPage>
    );
};

export default CardsPage;
