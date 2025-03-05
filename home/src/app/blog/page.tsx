"use client"
import { getBlogs } from '@/features/blog/actions';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { set } from 'zod';

const page = () => {
  const {data: Blogs, isLoading, error} = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs(),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Something went wrong. Please try again later.</p>
      </div>
    )
  }

  if (!Blogs || Blogs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">No blogs available at the moment.</p>
      </div>
    )
  }

  return (
    <div className='p-4 sm:p-8 bg-gray-100'>
      <h1 className='font-bold text-lg font-serif'>The Timeless Charm of Printed and Personalized Cards vs. eCards</h1>
      <p className='text-lg font-serif text-inline '>In today's digital world, where emails and text messages dominate communication, a tangible, personalized card carries a special significance. Whether it's a birthday greeting, a thank-you note, or a heartfelt holiday message, a printed card has a lasting impact that an eCard simply cannot match. Here's why sending a printed and personalized card is more meaningful than opting for a digital alternative.
      </p>
      <br />
      <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8'>
        {Blogs.map((blog) => (
        <div key={blog.id} className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <Link href={`/blog/${blog.slug}`}>
            <img className='w-full h-48 object-cover'
              src={blog.imageUrl || 'https://via.placeholder.com/150'}
              alt={blog.title || 'blog image'}
            />
          </Link>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
            <p className="text-gray-600 text-sm">{}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default page