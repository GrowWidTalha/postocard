"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { set } from 'zod';
interface User {
  image: string;
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const page = () => {
  const [Blogs, setBlogs] = useState<User[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://678a46d6dd587da7ac297368.mockapi.io/blog");
          const data = await response.json();
          setBlogs(data);
        } catch (error) {
          console.error("There was an error fetching the cards:", error);
        }
      };
      fetchData();
    }, []);
  return (
    <div className='p-4 sm:p-8 bg-gray-100'>
      <h1 className='font-bold text-lg font-serif'>The Timeless Charm of Printed and Personalized Cards vs. eCards</h1>
      <p className='text-lg font-serif text-inline '>In today’s digital world, where emails and text messages dominate communication, a tangible, personalized card carries a special significance. Whether it’s a birthday greeting, a thank-you note, or a heartfelt holiday message, a printed card has a lasting impact that an eCard simply cannot match. Here’s why sending a printed and personalized card is more meaningful than opting for a digital alternative.
      </p>
      <br />
      <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8'>
        {Blogs.map((blog) => (
        <div key = {blog.id} className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <Link href={`/blog/${blog.id}`} legacyBehavior={false}>
          <img className='w-full h-48 object-cover'
          src={blog.image || 'https://via.placeholder.com/150'}
          alt={blog.title || 'blog image'}
        />
        </Link>
         <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
              <p className="text-gray-600 text-sm">{}</p>
            </div>
            </div>
        )
      )}
      </div>

    </div>
  )
}

export default page

function asyc() {
  throw new Error('Function not implemented.');
}


function setCards(data: any) {
  throw new Error('Function not implemented.');
}
function fetchData() {
  throw new Error('Function not implemented.');
}

