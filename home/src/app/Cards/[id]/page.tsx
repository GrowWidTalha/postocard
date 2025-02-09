// "use client"
// import React, { useEffect, useState } from 'react'

// interface User {
//   title1: string;
//   imageUrl1: string;
//   id:number;
  
// }

// const page = () => {
//   const [cards, setCards] = useState<User[]>([]);
//   useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await fetch("https://679a856f747b09cdcccf1aaa.mockapi.io/cards");
//           const data = await response.json();
//           setCards(data);
//         } catch (error) {
//           console.error("There was an error fetching the cards:", error);
//         }
//       };
//       fetchData();
//     }, []);
  
//   return (

//    <div className="p-4 sm:p-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
//         {cards.map((card) => (
//           <div key={card.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div key={card.title1} className="bg-white rounded-lg shadow-lg overflow-hidden">
//             <img
//               className="w-full h-48 object-cover"
//               src={card.imageUrl1}
//               alt={card.title1}
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold text-gray-800">{card.title1}</h3>
//               <p className="text-gray-600 text-sm">{}</p>
//             </div>
//           </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default page
'use client';

import React, { useEffect, useState } from 'react';

interface User {
  title1: string;
  imageUrl1: string;
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
    <div className="p-4 sm:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src={card.imageUrl1}
              alt={card.title1}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{card.title1}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
