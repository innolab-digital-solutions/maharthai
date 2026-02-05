// components/workers/WorkerCard.tsx
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, CheckCircle } from "lucide-react"

interface WorkerCardProps {
  worker: {
    id: number
    name: string
    role: string
    rating: number
    reviews: number
    price: number
    image: string
    verified: boolean
    experience: string
  }
}

const WorkerCard = ({ worker }: WorkerCardProps) => {
  return (
    <Link href={`/workers/${worker.id}`}>
      <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <CardContent className="p-0">
          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={worker.image}
              alt={worker.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {worker.verified && (
              <Badge className="absolute top-2 right-2 bg-primary">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Name and Role */}
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{worker.name}</h3>
              <p className="text-sm text-gray-600">{worker.role}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm">{worker.rating.toFixed(1)}</span>
              <span className="text-sm text-gray-500">({worker.reviews} reviews)</span>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
              </svg>
              <span>{worker.experience} experience</span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div>
                <p className="text-xs text-gray-500">Starting from</p>
                <p className="font-bold text-lg text-primary">฿{worker.price.toLocaleString()}/mo</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default WorkerCard