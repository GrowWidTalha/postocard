"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../features/designs/actions/designs.actions";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DesignType } from "@prisma/client";

const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { data: categories, isPending } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await getAllCategories();
            return response;
        },
    });

    const designTypes = Object.values(DesignType);
    const currentType = searchParams.get("type") || designTypes[0];

    const handleTabChange = (value: string) => {
        router.push(`/Cards?type=${value}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex justify-center">
                    <Tabs value={currentType} onValueChange={handleTabChange}>
                        <TabsList>
                            {designTypes.map((type) => (
                                <TabsTrigger
                                    key={type}
                                    value={type}
                                    className="capitalize"
                                >
                                    {type.toLowerCase()}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>

                {isPending ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <FaSpinner className="animate-spin text-4xl text-yellow-500" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories
                            // @ts-ignore
                            ?.filter((card) => card.designType === currentType)
                            //   @ts-ignore
                            .map((card) => (
                                <Link
                                    href={`/Cards/${card.name.replace(" ", "-")}`}
                                    key={card.id}
                                    className="transform transition-all duration-300 hover:scale-105"
                                >
                                    <div className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100">
                                        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                                            {/* Add image here if available */}
                                            {/* <div className="w-full h-48 bg-gradient-to-br from-yellow-100 to-yellow-300" /> */}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">
                                                {card.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                Explore our beautiful collection of {card.name.toLowerCase()} cards
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
