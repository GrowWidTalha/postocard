"use client";
import { Spinner } from "@/components/spinner";
import { getAllDesigns } from "@/features/designs/actions/design.action";
import DesignCard from "@/features/designs/components/DesignCard";
import DesignsFilters from "@/features/designs/components/DesignsFilters";
import { Design } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useEffect } from "react";

const DesignPageContent = ({
    initialDesigns,
}: {
    initialDesigns: Design[];
}) => {
    const {
        data: designs,
        isPending,
        isError,
        error,
        fetchStatus,
        status: queryStatus,
    } = useQuery({
        queryKey: ["designs"],
        queryFn: async () => {
            const res = await getAllDesigns();
            return res.data;
        },
        initialData: initialDesigns,
        // staleTime: 60000,
        refetchOnWindowFocus: false,
    });

    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const status = searchParams.get("status") || "";
    const category = searchParams.get("category") || "";
    const designer = searchParams.get("designer") || "";

    const filteredDesigns = useMemo(() => {
        return (
            // @ts-ignore
            designs?.filter((design) => {
                const matchesQuery = query
                    ? design.name.toLowerCase().includes(query.toLowerCase()) ||
                    design.description.toLowerCase().includes(query.toLowerCase())
                    : true;
                const matchesStatus =
                    status && status !== "all"
                        ? design.status === status.toUpperCase()
                        : true;
                const matchesCategory =
                    category && category !== "all"
                        ? design.designCategoryId === category
                        : true;
                const matchesDesignerId = designer ? design.userId === designer : true;

                return (
                    matchesQuery && matchesStatus && matchesCategory && matchesDesignerId
                );
            }) || []
        );
    }, [designs, query, status, category, designer]);

    if (isError) {
        return <div>Error: {(error as Error).message}</div>;
    }

    return (
        <div>
            <DesignsFilters />
            <div className="my-6">
                {isPending ? (
                    <div className="flex items-center justify-center h-64 w-full">
                        <Spinner className="text-primary" size="large" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredDesigns.length > 0 ? (
                            // @ts-ignore
                            filteredDesigns.map((design) => (
                                <DesignCard key={design.id} design={design} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10">
                                No designs found matching the current filters.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DesignPageContent;
