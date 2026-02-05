// components/reusable/HeroSlider.tsx
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

interface HeroSliderProps {
  image: string
  title: string
  description: string
  badge?: {
    text: string
    icon?: ReactNode
  }
  buttons?: {
    primary?: {
      text: string
      href: string
    }
    secondary?: {
      text: string
      href: string
    }
  }
  priority?: boolean
}

const HeroSlider = ({
  image,
  title,
  description,
  badge,
  buttons,
  priority = false
}: HeroSliderProps) => {
  return (
    <div className="relative h-screen text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        priority={priority}
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="container mx-auto h-full grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 md:px-10">
            {badge && (
              <p className="text-xs bg-primary w-fit px-4 rounded-3xl py-1 flex items-center gap-1 mb-3">
                {badge.icon}
                {badge.text}
              </p>
            )}
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {title}
            </h1>
            
            <p className="text-sm md:text-lg text-white/90 max-w-md">
              {description}
            </p>

            {/* CTA Buttons */}
            {buttons && (
              <div className="flex gap-4">
                {buttons.primary && (
                  <Button asChild size="lg" className="mt-6 w-38 rounded-3xl">
                    <Link href={buttons.primary.href}>{buttons.primary.text}</Link>
                  </Button>
                )}

                {buttons.secondary && (
                  <Button 
                    asChild 
                    size="lg" 
                    variant="glass" 
                    className="mt-6 rounded-3xl border-white/20 hover:shadow-lg hover:shadow-white/10 min-w-38"
                  >
                    <Link href={buttons.secondary.href}>{buttons.secondary.text}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSlider