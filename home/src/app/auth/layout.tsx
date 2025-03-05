import React from 'react'
import Image from 'next/image'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen w-full flex'>
      <div className='hidden md:flex w-1/2 bg-yellow-50 flex-col items-center justify-center p-8'>
        <Image 
          src="/4.jpg"
          alt="PostoCard Logo"
          width={120}
          height={120}
          className="mb-6"
        />
        <h1 className="text-5xl font-bold text-yellow-500 font-serif mb-4">PostoCard</h1>
        <p className="text-xl text-gray-600 font-serif text-center max-w-md">
          Create and send beautiful custom cards for every occasion
        </p>
      </div>
      <div className='w-full md:w-1/2 flex items-center justify-center bg-white'>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
