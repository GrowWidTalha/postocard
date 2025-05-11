"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSubCategoriesByCategoryName } from "@/features/designs/actions/designs.actions";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = useParams();

    if (!id) return;
    const { data, isPending } = useQuery({
        queryKey: ["subcategories", id],
        queryFn: async () => {
            const response = await getSubCategoriesByCategoryName(
                // @ts-ignore
                id.replace("-", " ")
            );
            if (response) {
            }
            return response;
        },
    });

    if (!isPending && !data) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">
                Cards not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* @ts-ignore */}
                <h1 className="text-3xl font-serif font-semibold text-gray-800 mb-8">{id.replace("-", " ")}</h1>

                {isPending ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <FaSpinner className="animate-spin text-4xl text-yellow-500" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* @ts-ignore */}
                        {data?.map((card) => (
                            <Link
                                href={`/Cards/${id}/${card.name.replace(" ", "-")}`}
                                key={card.id}
                                className="transform transition-all duration-300 hover:scale-105"
                            >
                                <div className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100">
                                    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                                        {/* <div className="w-full h-48 bg-gradient-to-br from-yellow-100 to-yellow-300" /> */}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">
                                            {card.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Explore our beautiful collection of {card.name.toLowerCase()}
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
