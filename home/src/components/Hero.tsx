import { GiSunflower } from 'react-icons/gi'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'

const Mid = () => {
  return (
    <div className='w-full min-h-screen lg:h-[calc(100vh-12vh)] flex items-center justify-center bg-white py-8 px-4 sm:px-16'>
      <div className='w-full max-w-6xl mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-8 md:gap-30'>
        {/* Text Content */}
        <div className='text-center lg:text-left'>
          <h1 className='text-3xl sm:text-5xl md:text-5xl lg:text-4xl xl:text-5xl font-bold text-black uppercase font-serif mb-4'>
            PostoCard Personalized Greeting Card App
          </h1>

          <p className='text-lg sm:text-xl md:text-2xl font-serif text-black mb-6'>
            A Thoughtful Touch for Every Occasion
          </p>

          <p className='text-base sm:text-lg text-gray-700 font-serif mb-8 leading-relaxed'>
            At PostoCard, we believe that every message deserves a personal touch. Our beautifully designed 5x7-inch greeting cards let you celebrate life’s special moments in a way that’s truly unique.
          </p>

          <div className='flex justify-center lg:justify-start'>
            <Link href={'/Cards'}>
            <Button
              size="lg"
              className='bg-pink-600 hover:bg-pink-400 font-serif w-full sm:w-auto px-8 py-4 text-lg'
            >
              View Cards
            </Button>
            </Link>
          </div>
        </div>

        {/* Image Section - Now visible on mobile */}
        <div className='relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[420px] order-first lg:order-last'>
          <Image
            src="/4.jpg"
            alt="Personalized Greeting Card Design"
            layout="fill"
            objectFit="contain"
            className='rounded-lg '
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default Mid
