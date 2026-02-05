// components/HeroSection.tsx
'use client'

import { useTranslations } from "next-intl"
import AutoCarousel, { CarouselSlide } from "@/components/resuable/AutoCarousel"
import HeroSlider from "@/components/resuable/HeroSlider"

const HeroSection = () => {
  const t = useTranslations('home')

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  )

  const slideData = [
    {
      id: 1,
      image: "/carousel-1.jpg",
      titleKey: "hero.title",
      descriptionKey: "hero.subtitle",
    },
    {
      id: 2,
      image: "/carousel-2.jpg",
      titleKey: "hero.title",
      descriptionKey: "hero.subtitle",
    },
    {
      id: 3,
      image: "/carousel-3.jpg",
      titleKey: "hero.title",
      descriptionKey: "hero.subtitle",
    },
  ]

  const slides: CarouselSlide[] = slideData.map((slide, index) => ({
    id: slide.id,
    content: (
      <HeroSlider
        image={slide.image}
        title={t(slide.titleKey)}
        description={t(slide.descriptionKey)}
        priority={index === 0}
        badge={{
          text: "Trusted by 1000+ families",
          icon: <CheckIcon />
        }}
        buttons={{
          primary: {
            text: "Book Now",
            href: "/workers"
          },
          secondary: {
            text: "View Services",
            href: "/workers"
          }
        }}
      />
    )
  }))

  return <AutoCarousel slides={slides} autoplayDelay={3500} />
}

export default HeroSection