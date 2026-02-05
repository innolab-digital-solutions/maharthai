// components/reusable/AutoCarousel.tsx
'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef, ReactNode, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export interface CarouselSlide {
  id: number | string
  content: ReactNode
}

interface AutoCarouselProps {
  slides: CarouselSlide[]
  autoplayDelay?: number
  stopOnInteraction?: boolean
  className?: string
  showIndicators?: boolean
  indicatorPosition?: 'bottom-center' | 'bottom-left' | 'bottom-right'
  indicatorClassName?: string
}

const AutoCarousel = ({ 
  slides, 
  autoplayDelay = 3500, 
  stopOnInteraction = true,
  className = "w-full",
  showIndicators = true,
  indicatorPosition = 'bottom-center',
  indicatorClassName
}: AutoCarouselProps) => {
  const autoplay = useRef(Autoplay({ delay: autoplayDelay, stopOnInteraction }))
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const scrollTo = (index: number) => {
    api?.scrollTo(index)
  }

  const indicatorPositionClasses = {
    'bottom-center': 'bottom-8 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-8 left-8',
    'bottom-right': 'bottom-8 right-8',
  }

  return (
    <div className={cn("relative", className)}>
      <Carousel 
        setApi={setApi}
        plugins={[autoplay.current]} 
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              {slide.content}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className={cn(
          "absolute z-20 flex gap-2",
          indicatorPositionClasses[indicatorPosition],
          indicatorClassName
        )}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                current === index 
                  ? "w-8 bg-white" 
                  : "w-2 bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default AutoCarousel