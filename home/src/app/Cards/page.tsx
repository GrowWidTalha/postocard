"use client";
import { Key } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface User {
  title: string;
  description: string;
  imageurl: string;
  CreatedAt: string;
  id: number;
}

const Page = () => {
  const [cards, setCards] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://679a856f747b09cdcccf1aaa.mockapi.io/cards");
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("There was an error fetching the cards:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-2 xs:p-4 sm:p-8 bg-gray-100 sm:w-6/7 sm:h-10/12">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 gap-8 xs:gap-6 sm:gap-8 lg:gap-10">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Link href={`/Cards/${card.id}`} legacyBehavior>
              <img
                className="w-full h-32 xs:h-40 sm:h-48 object-cover"
                src={card.imageurl || 'https://via.placeholder.com/150'}
                alt={card.title || 'Card image'}
              />
            </Link>
            <div className="p-2 xs:p-3 sm:p-4">
              <h3 className="text-lg xs:text-xl font-semibold text-gray-800">{card.title}</h3>
              <p className="text-gray-600 text-xs xs:text-sm">{card.CreatedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

