"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../features/designs/actions/designs.actions";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa";
import Image from "next/image";

const Page = () => {
  const {data: categories, isPending  }= useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getAllCategories();
      return response;
    },
  });


  return (
    <div className="p-2 xs:p-4 sm:p-8 bg-gray-100 sm:w-6/7 sm:h-10/12 cursor-pointer min-h-screen">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 gap-8 xs:gap-6 sm:gap-8 lg:gap-10">
        {isPending ? <FaSpinner className="animate-spin" /> : (
            <div>
                {categories?.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <Link href={`/Cards/${card.name.replace(" ", "-")}`}>
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
    </div>
  );
};

export default Page;
