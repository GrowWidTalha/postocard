"use client"
import { getBlogs } from '@/features/blog/actions';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {
  const { data: Blogs, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-24 h-24 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">Something went wrong. Please try again later.</p>
      </div>
    );
  }

  if (!Blogs || Blogs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">No blogs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className='p-4 sm:p-8 bg-gray-100'>
      <h1 className='font-bold text-2xl text-center mb-6'>
        The Timeless Charm of Printed and Personalized Cards vs. eCards
      </h1>
      <p className='text-lg text-gray-700 text-center mb-8'>
        In today's digital world, where emails and text messages dominate communication, a tangible, personalized card carries a special significance.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Blogs.map((blog) => (
          <div key={blog.id} className='bg-white rounded-2xl shadow-md hover:shadow-4xl transition-shadow'>
            <Link href={`/blog/${blog.slug}`} passHref>
              <div className='relative h-[350px] w-full'>
                <Image
                  src={blog.imageUrl || '/fallback-image.jpg'}
                  alt={blog.title || 'Blog Image'}
                  layout='fill'
                  objectFit='cover'
                  className='rounded-t-2xl'
                  priority
                />
              </div>
            </Link>
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">{blog.title || 'Untitled Blog'}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;

