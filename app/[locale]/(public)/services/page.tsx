// app/[locale]/(public)/services/page.tsx
'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import AutoCarousel, { CarouselSlide } from "@/components/resuable/AutoCarousel"
import HeroSlider from "@/components/resuable/HeroSlider"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import WorkerCard from "@/components/workers/WorkerCard"
import { 
  WORKERS_DATA, 
  SERVICE_TYPES, 
  EXPERIENCE_RANGES, 
  AVAILABILITY_OPTIONS, 
  RATING_OPTIONS,
  SORT_OPTIONS,
  type SortOption 
} from '@/lib/constants'
import { filterWorkers, sortWorkers, type WorkerFilters } from '@/lib/filterWorkers'
import { SlidersHorizontal } from "lucide-react"

const WORKERS_PER_PAGE = 9

const FilterSection = ({ 
  filters,
  onFiltersChange,
  priceRange,
  onPriceRangeChange,
  onResetFilters
}: { 
  filters: WorkerFilters
  onFiltersChange: (key: keyof WorkerFilters, value: any) => void
  priceRange: number[]
  onPriceRangeChange: (value: number[]) => void
  onResetFilters: () => void
}) => {
  const toggleArrayFilter = (key: keyof WorkerFilters, value: string) => {
    const currentArray = filters[key] as string[]
    const updated = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    onFiltersChange(key, updated)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" className="text-primary" onClick={onResetFilters}>
          Reset
        </Button>
      </div>

      {/* Service Type */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Service Type</h4>
        <div className="space-y-2">
          {SERVICE_TYPES.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox 
                id={service}
                checked={filters.serviceTypes.includes(service)}
                onCheckedChange={() => toggleArrayFilter('serviceTypes', service)}
              />
              <Label htmlFor={service} className="text-sm font-normal cursor-pointer">
                {service}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Price Range (THB/month)</h4>
        <div className="px-2">
          <Slider
            defaultValue={[0, 20000]}
            max={25000}
            step={500}
            value={priceRange}
            onValueChange={onPriceRangeChange}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>฿{priceRange[0]}</span>
            <span>฿{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Experience</h4>
        <div className="space-y-2">
          {EXPERIENCE_RANGES.map((exp) => (
            <div key={exp.label} className="flex items-center space-x-2">
              <Checkbox 
                id={exp.label}
                checked={filters.experienceRanges.includes(exp.label)}
                onCheckedChange={() => toggleArrayFilter('experienceRanges', exp.label)}
              />
              <Label htmlFor={exp.label} className="text-sm font-normal cursor-pointer">
                {exp.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Availability</h4>
        <div className="space-y-2">
          {AVAILABILITY_OPTIONS.map((avail) => (
            <div key={avail} className="flex items-center space-x-2">
              <Checkbox 
                id={avail}
                checked={filters.availability.includes(avail)}
                onCheckedChange={() => toggleArrayFilter('availability', avail)}
              />
              <Label htmlFor={avail} className="text-sm font-normal cursor-pointer">
                {avail}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Minimum Rating</h4>
        <div className="space-y-2">
          {RATING_OPTIONS.map((rating) => (
            <div key={rating.label} className="flex items-center space-x-2">
              <Checkbox 
                id={rating.label}
                checked={filters.minRating === rating.value}
                onCheckedChange={() => 
                  onFiltersChange('minRating', filters.minRating === rating.value ? null : rating.value)
                }
              />
              <Label htmlFor={rating.label} className="text-sm font-normal cursor-pointer">
                ⭐ {rating.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Only */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="verified"
            checked={filters.verifiedOnly}
            onCheckedChange={(checked) => onFiltersChange('verifiedOnly', checked)}
          />
          <Label htmlFor="verified" className="text-sm font-normal cursor-pointer">
            Verified workers only
          </Label>
        </div>
      </div>
    </div>
  )
}

const ServicesPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('recommended')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<WorkerFilters>({
    serviceTypes: [],
    priceRange: [0, 25000],
    experienceRanges: [],
    availability: [],
    minRating: null,
    verifiedOnly: false,
  })
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize filters from URL on mount
  useEffect(() => {
    const serviceTypes = searchParams.getAll('service') || []
    const priceMin = parseInt(searchParams.get('priceMin') || '0')
    const priceMax = parseInt(searchParams.get('priceMax') || '25000')
    const experienceRanges = searchParams.getAll('experience') || []
    const availability = searchParams.getAll('availability') || []
    const minRating = searchParams.get('rating') ? parseFloat(searchParams.get('rating')!) : null
    const verifiedOnly = searchParams.get('verified') === 'true'
    const sort = (searchParams.get('sort') as SortOption) || 'recommended'
    const page = parseInt(searchParams.get('page') || '1')

    setFilters({
      serviceTypes,
      priceRange: [priceMin, priceMax],
      experienceRanges,
      availability,
      minRating,
      verifiedOnly,
    })
    setSortBy(sort)
    setCurrentPage(page)
    setIsInitialized(true)
  }, [searchParams])

  // Update URL when filters change
  const updateURL = (newFilters: WorkerFilters, newSortBy: SortOption, page: number = 1) => {
    const params = new URLSearchParams()

    newFilters.serviceTypes.forEach(service => params.append('service', service))
    params.set('priceMin', newFilters.priceRange[0].toString())
    params.set('priceMax', newFilters.priceRange[1].toString())
    newFilters.experienceRanges.forEach(exp => params.append('experience', exp))
    newFilters.availability.forEach(avail => params.append('availability', avail))
    if (newFilters.minRating !== null) params.set('rating', newFilters.minRating.toString())
    params.set('verified', newFilters.verifiedOnly.toString())
    params.set('sort', newSortBy)
    params.set('page', page.toString())

    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleFilterChange = (key: keyof WorkerFilters, value: any) => {
    const newFilters = {
      ...filters,
      [key]: value
    }
    setFilters(newFilters)
    updateURL(newFilters, sortBy, 1) // Reset to page 1 when filters change
  }

  const handlePriceRangeChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      priceRange: [value[0], value[1]]
    }
    setFilters(newFilters)
    updateURL(newFilters, sortBy, 1) // Reset to page 1 when filters change
  }

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort)
    updateURL(filters, newSort, 1) // Reset to page 1 when sort changes
  }

  const handleResetFilters = () => {
    const defaultFilters: WorkerFilters = {
      serviceTypes: [],
      priceRange: [0, 25000],
      experienceRanges: [],
      availability: [],
      minRating: null,
      verifiedOnly: false,
    }
    setFilters(defaultFilters)
    setSortBy('recommended')
    setCurrentPage(1)
    router.push('?', { scroll: false })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    updateURL(filters, sortBy, page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Apply filters and sorting
  const filteredAndSortedWorkers = useMemo(() => {
    const filtered = filterWorkers(WORKERS_DATA, filters)
    const sorted = sortWorkers(filtered, sortBy)
    return sorted
  }, [filters, sortBy])

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedWorkers.length / WORKERS_PER_PAGE)
  const startIndex = (currentPage - 1) * WORKERS_PER_PAGE
  const endIndex = startIndex + WORKERS_PER_PAGE
  const paginatedWorkers = filteredAndSortedWorkers.slice(startIndex, endIndex)

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxPagesToShow = 5
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      
      if (currentPage > 3) {
        pages.push('...')
      }
      
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = startPage; i <= endPage; i++) {
        if (!pages.includes(i)) {
          pages.push(i)
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...')
      }
      
      pages.push(totalPages)
    }
    
    return pages
  }

  if (!isInitialized) {
    return null // Avoid hydration mismatch
  }

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  )

  const slideData = [
    {
      id: 1,
      image: "/carousel-1.jpg",
      titleKey: "Meet Our Top-Rated Household Professionals.",
      descriptionKey: "Discover trusted experts for cleaning, cooking, childcare, and more.",
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
        title={slide.titleKey}
        description={slide.descriptionKey}
        priority={index === 0}
        badge={{
          text: "Trusted by 1000+ families",
          icon: <CheckIcon />
        }}
        buttons={{
          primary: {
            text: "Browse Top Talent",
            href: "/workers"
          },
          secondary: {
            text: "Employer Safety Tips",
            href: "/workers"
          }
        }}
      />
    )
  }))

  return (
    <>
      <AutoCarousel slides={slides} autoplayDelay={3500} />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 text-center space-y-2">
          <h2 className="font-bold text-2xl md:text-3xl">Available Services</h2>
          <p className="text-slate-500">Showing {filteredAndSortedWorkers.length} verified workers for you</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-lg border p-6">
              <FilterSection 
                filters={filters}
                onFiltersChange={handleFilterChange}
                priceRange={filters.priceRange}
                onPriceRangeChange={handlePriceRangeChange}
                onResetFilters={handleResetFilters}
              />
            </div>
          </aside>

          {/* Right Content - Workers Grid */}
          <main className="lg:col-span-3">
            {/* Sort and Mobile Filter Button */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{filteredAndSortedWorkers.length}</span> workers found
              </p>

              <div className="flex gap-3">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mobile Filters Panel */}
            {mobileFiltersOpen && (
              <div className="lg:hidden mb-6 bg-white rounded-lg border p-6">
                <FilterSection 
                  filters={filters}
                  onFiltersChange={handleFilterChange}
                  priceRange={filters.priceRange}
                  onPriceRangeChange={handlePriceRangeChange}
                  onResetFilters={handleResetFilters}
                />
              </div>
            )}

            {/* Workers Grid */}
            {paginatedWorkers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedWorkers.map((worker) => (
                  <WorkerCard key={worker.id} worker={worker} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No workers found matching your criteria</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={handleResetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredAndSortedWorkers.length > 0 && totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`dots-${index}`} className="px-2 py-1 text-gray-500">
                      ...
                    </span>
                  ) : (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page as number)}
                      className={currentPage === page ? "bg-primary text-white" : ""}
                    >
                      {page}
                    </Button>
                  )
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
}

export default ServicesPage