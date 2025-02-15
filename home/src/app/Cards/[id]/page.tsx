"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface User {
  title1: string;
  imageurl1: string;
  id: number;
}

const Page = () => {
  const params = useParams();
  const id = params?.id; // Ensure id is retrieved as a string
  const [cards, setCards] = useState<User[]>([]);
  const [selectedCard, setSelectedCard] = useState<User | null>(null);

  useEffect(() => {
    if (!id) return; // Prevent fetch if id is missing

    const fetchData = async () => {
      try {
        const response = await fetch("https://679a856f747b09cdcccf1aaa.mockapi.io/cards");
        const data: User[] = await response.json();
        setCards(data);

        // Find the card by id
        const card = data.find((item) => String(item.id) === String(id)); // Ensure type match
        setSelectedCard(card || null);
      } catch (error) {
        console.error("Error fetching the cards:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!selectedCard) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">
        Cards not found.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-100 sm:w-6/7 sm:h-10/12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          className="w-full h-48 object-cover"
          src={selectedCard.imageurl1}
          alt={selectedCard.title1}
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{selectedCard.title1}</h3>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Page;
