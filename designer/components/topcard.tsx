// export default topcard
import React from 'react'
import { FaDollarSign } from 'react-icons/fa'
import { IoPerson } from 'react-icons/io5'
import { TbActivityHeartbeat } from 'react-icons/tb'

const TopCard = () => {
  return (
    <div className='flex flex-row top-4 gap-16'>
      {/* Card 1 */}
      <div className='lg:col-span-2 col-span-1 bg-white flex justify-between border p-4 rounded-lg'>
        <div className='flex flex-col w-full items-center text-center pb-4'>
          <FaDollarSign className='text-4xl text-green-500' />
          <p className='text-2xl font-bold'>$1234</p>
          <p className='text-gray-600'>Daily Revenue</p>
          <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
            <span className='text-green-700 text-lg'>+18% from last Month</span>
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className='lg:col-span-2 col-span-1 bg-white flex justify-between border p-4 rounded-lg'>
        <div className='flex flex-col w-full items-center text-center pb-4'>
          <IoPerson className='text-4xl text-blue-500' />
          <p className='text-2xl font-bold'>+45120</p>
          <p className='text-gray-600'>Sales</p>
          <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
            <span className='text-green-700 text-lg'>+20% from last Month</span>
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className='lg:col-span-2 col-span-1 bg-white flex justify-between border p-4 rounded-lg'>
        <div className='flex flex-col w-full items-center text-center pb-4'>
          <TbActivityHeartbeat className='text-4xl text-red-500' />
          <p className='text-2xl font-bold'>+4520</p>
          <p className='text-gray-600'>Users</p>
          <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
            <span className='text-green-700 text-lg'>+200 from last hour</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default TopCard
