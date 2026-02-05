'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslations } from 'next-intl';

const categories = [
  {
    id: 1,
    nameKey: 'babysitting',
    descriptionKey: 'Experienced childcare professionals for your family',
    image: '/nanny.jpg',
  },
  {
    id: 2,
    nameKey: 'cleaning',
    descriptionKey: 'Hire reliable and efficient maids',
    image: '/nanny.jpg',
  },
  {
    id: 3,
    nameKey: 'driving',
    descriptionKey: 'Get professional and safe drivers',
    image: '/nanny.jpg',
  },
  {
    id: 4,
    nameKey: 'cooking',
    descriptionKey: 'Experienced home cooks for your family',
    image: '/nanny.jpg',
  },
  {
    id: 5,
    nameKey: 'caretaking',
    descriptionKey: 'Trusted caretakers for elders',
    image: '/nanny.jpg',
  },
  {
    id: 6,
    nameKey: 'cleaning',
    descriptionKey: 'Professional cleaning services',
    image: '/nanny.jpg',
  },
]

const FindTheWorker = () => {
    const t = useTranslations('footer');
    const homeT = useTranslations('home');
    
    useEffect(() => {
  AOS.init({
    once: true,
    duration: 800,
  })
}, [])
    
  return (
    <div className="mt-15 md:mt-25">
      {/* Title animation */}
      <div className='text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-1000 px-5 md:px-0'
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h1
        className="text-2xl md:text-4xl font-semibold"
      >
        {homeT('findWorker.title')}
      </h1>

      <p className='text-slate-500 text-sm md:text-base'>
        {homeT('findWorker.description')}
      </p>
      </div>

      <div className="mt-10 mx-auto max-w-6xl">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                     gap-y-10 justify-items-center cursor-pointer"
        >
          {categories.map((category, index) => (
            <div
              key={category.id}
              style={{ animationDelay: `${index * 120}ms` }}
              className="
                w-[340px]
                fill-mode-both
                group
              "
            data-aos="fade-up"
          data-aos-delay={index * 150}
            >
              {/* Image */}
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={category.image}
                  width={340}
                  height={340}
                  alt={t(category.nameKey)}
                  className="
                    mx-auto rounded-xl
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              {/* Text */}
              <h2 className="text-lg mt-4 font-medium">
                {t(category.nameKey)}
              </h2>
              <p className="text-slate-500 mt-1">
                {category.descriptionKey}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FindTheWorker
