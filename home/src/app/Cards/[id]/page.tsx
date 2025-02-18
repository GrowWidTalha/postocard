"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSubCategoriesByCategoryName } from "@/features/designs/actions/designs.actions";
import { SubCategory } from "@prisma/client";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface User {
  title1: string;
  imageurl1: string;
  id: number;
}

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = useParams();

  if(!id) return;
  const {data, isPending} = useQuery({
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
    <div className="p-2 xs:p-4 sm:p-8 bg-gray-100 sm:w-6/7 sm:h-10/12 min-h-screen cursor-pointer">
        {/* @ts-ignore */}
        <h1 className="text-4xl font-bold my-4">{id.replace("-", " ")}</h1>
      {isPending ? <div className="min-h-screen flex items-center justify-center w-full">
          <FaSpinner className="animate-spin" />
        </div>
        : (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 gap-8 xs:gap-6 sm:gap-8 lg:gap-10">
              {data?.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <Link href={`/cards/${id}/${card.name.replace(" ", "-")}`} legacyBehavior>
                    <img
                      className="w-full h-32 xs:h-40 sm:h-48 object-cover"
                      src={card.thumbnailUrl || "https://via.placeholder.com/150"}
                      alt={card.name || "Card image"}
                    />
                  </Link>
                  <div className="p-2 xs:p-3 sm:p-4">
                    <h3 className="text-lg xs:text-xl font-semibold text-gray-800">
                      {card.name}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
      )}
  </div>
  );
};

export default Page;
