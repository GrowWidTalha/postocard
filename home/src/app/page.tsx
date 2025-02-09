import Hero from '@/components/Hero'

import Middle from '@/components/Middle'
import React from 'react'

const page = () => {
  return (
    <div>
      <Hero/>
      <Middle/>
      <img src="/banner.webp" alt="banner" />
    </div>
  )
}

export default page