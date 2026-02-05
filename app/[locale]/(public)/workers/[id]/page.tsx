// app/[locale]/(public)/workers/[id]/page.tsx
'use client'

import { use } from 'react'
import Image from "next/image"
import { notFound } from "next/navigation"
import { Star, MapPin, Heart, Share2, User, Briefcase, Languages, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { WORKERS_DATA } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface PageProps {
  params: Promise<{ id: string; locale: string }>
}

export default function WorkerDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const worker = WORKERS_DATA.find(w => w.id.toString() === id)

  if (!worker) {
    notFound()
  }

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      avatar: null,
      initials: "JD",
      rating: 5,
      date: "2 weeks ago",
      comment: `${worker.name.split(' ')[0]} was excellent! She arrived on time and did a fantastic job cleaning our condo. Very polite and professional.`
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      avatar: "/avatars/sarah.jpg",
      initials: "SJ",
      rating: 4,
      date: "1 month ago",
      comment: "Great with kids. My son loved her immediately. Cooking was good but a bit spicy for us."
    },
  ]

  return (
    <div className="w-full bg-background">
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-5">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap gap-2 py-4 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-primary font-medium">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/services" className="text-muted-foreground hover:text-primary font-medium">
            Domestic Workers
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">Profile</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  {/* Avatar */}
                  <div className="relative group">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden shadow-md ring-4 ring-background">
                      <Image
                        src={worker.image}
                        alt={worker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Online Status Badge */}
                    <div className="absolute bottom-1 right-1 bg-green-500 rounded-full p-1 border-2 border-background" title="Available Now">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex flex-col flex-1 gap-1">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold">{worker.name}</h1>
                        {worker.verified && (
                          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>
                            <span className="text-sm font-medium">Verified Identity</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Rating Badge */}
                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-900">
                        <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                        <span className="font-bold">{worker.rating}</span>
                        <span className="text-xs text-muted-foreground">({worker.reviews} reviews)</span>
                      </div>
                    </div>

                    <p className="text-lg font-medium mt-2">{worker.role}</p>
                    
                    <div className="flex items-center gap-1 text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{worker.location}, Thailand</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Me */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  About Me
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Sawasdee ka! I have over {worker.experience} of experience as a {worker.role.toLowerCase()} in {worker.location}. I am reliable, hardworking, and love children. I previously worked for a diplomatic family for 4 years, where I honed my skills in maintaining a pristine household and caring for toddlers.
                  </p>
                  <p>
                    I can cook authentic Thai food and basic Western dishes. I am fully vaccinated and have a clean background check.
                  </p>
                  <p>
                    I am looking for a full-time position but am open to part-time gigs during weekends. I love pets, especially dogs!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skills */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {worker.skills?.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Languages className="w-5 h-5 text-primary" />
                    Languages
                  </h2>
                  <div className="flex flex-col gap-4">
                    {/* Thai */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Thai</span>
                        <span className="text-sm text-muted-foreground">Native</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    {/* English */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">English</span>
                        <span className="text-sm text-muted-foreground">Intermediate</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reviews */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Reviews ({worker.reviews})
                  </h2>
                  <Button variant="link" className="text-primary">View All</Button>
                </div>

                <div className="flex flex-col gap-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
                      <div className="flex gap-4">
                        {/* Avatar */}
                        <div className="bg-secondary rounded-full h-10 w-10 flex items-center justify-center overflow-hidden shrink-0">
                          {review.avatar ? (
                            <Image src={review.avatar} alt={review.name} width={40} height={40} />
                          ) : (
                            <span className="text-sm font-bold">{review.initials}</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-sm">{review.name}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                            <div className="flex text-amber-500">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "w-4 h-4",
                                    i < review.rating ? "fill-amber-500" : "fill-gray-300"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 flex flex-col gap-6">
              {/* Booking Card */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  {/* Pricing */}
                  <div className="flex justify-between items-end mb-4 border-b pb-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-muted-foreground">Daily Rate</span>
                      <span className="text-2xl font-bold">฿{worker.price.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-muted-foreground">Hourly Rate</span>
                      {/* <span className="text-lg font-bold">฿{worker.hourlyRate || 150}</span> */}
                    </div>
                  </div>

                  {/* Availability Calendar Preview */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-sm">Availability</h3>
                      <Button variant="link" size="sm" className="text-primary text-xs p-0 h-auto">
                        View Full Calendar
                      </Button>
                    </div>
                    
                    {/* Calendar Days Header */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-muted-foreground font-medium">
                      <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                      <div className="p-1 rounded text-gray-300">28</div>
                      <div className="p-1 rounded text-gray-300">29</div>
                      <div className="p-1 rounded text-gray-300">30</div>
                      <div className="p-1 rounded bg-green-100 text-green-700 font-medium cursor-pointer hover:bg-green-200">1</div>
                      <div className="p-1 rounded bg-green-100 text-green-700 font-medium cursor-pointer hover:bg-green-200">2</div>
                      <div className="p-1 rounded bg-red-100 text-red-700 font-medium line-through opacity-50">3</div>
                      <div className="p-1 rounded bg-red-100 text-red-700 font-medium line-through opacity-50">4</div>
                      <div className="p-1 rounded bg-green-100 text-green-700 font-medium cursor-pointer hover:bg-green-200">5</div>
                      <div className="p-1 rounded bg-green-100 text-green-700 font-medium cursor-pointer hover:bg-green-200">6</div>
                      <div className="p-1 rounded bg-green-100 text-green-700 font-medium cursor-pointer hover:bg-green-200">7</div>
                      <div className="p-1 rounded bg-green-100 text-green-700 font-medium cursor-pointer hover:bg-green-200">8</div>
                      <div className="p-1 rounded bg-green-100 text-green-700 font-medium cursor-pointer hover:bg-green-200">9</div>
                      <div className="p-1 rounded bg-secondary text-muted-foreground">10</div>
                      <div className="p-1 rounded bg-secondary text-muted-foreground">11</div>
                    </div>

                    {/* Legend */}
                    <div className="flex gap-4 mt-2 text-xs justify-center">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-muted-foreground">Available</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-muted-foreground">Booked</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <Button size="lg" className="w-full shadow-md hover:shadow-lg">
                      Book Now
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                      Contact {worker.name.split(' ')[0]}
                    </Button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground mt-3">
                    No charge until job is confirmed.
                  </p>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold text-sm mb-3">Maharthai Guarantee</h3>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-green-600 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Identity Verified</span>
                        <span className="text-xs text-muted-foreground">Gov ID & criminal check passed.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-blue-600 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Satisfaction Guaranteed</span>
                        <span className="text-xs text-muted-foreground">Not happy? We&apos;ll make it right.</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}