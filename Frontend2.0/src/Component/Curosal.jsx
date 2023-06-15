'use client';

import { Carousel } from 'flowbite-react';
import logo from '../images/slide1.png'
import slide2 from '../images/slide5.jpg'
import slide3 from '../images/slide3.jpg'
import slide4 from '../images/slide4.jpg'

export default function DefaultCarousel() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 p-5 bg-gray-200 ">
    <Carousel>
      <img
        alt="..."
        src={logo}
        className='w-full h-full '
      />
      <img
        alt="..."
        src={slide2}
        className='w-full h-full'
      />
      <img
        alt="..."
        src={slide3}
        className='w-full h-full'
      />
      <img
        alt="..."
        src={slide4}
        className='w-full h-full'
      />
    </Carousel>
    </div>
  )
}


