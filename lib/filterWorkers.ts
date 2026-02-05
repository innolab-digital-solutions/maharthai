// lib/filterWorkers.ts
import { Worker } from "@/types/worker"
import { SortOption } from "@/lib/constants"

export interface WorkerFilters {
  serviceTypes: string[]
  priceRange: [number, number]
  experienceRanges: string[]
  availability: string[]
  minRating: number | null
  verifiedOnly: boolean
  location?: string
}

export function filterWorkers(
  workers: Worker[],
  filters: WorkerFilters
): Worker[] {
  return workers.filter((worker) => {
    // Filter by service type
    if (filters.serviceTypes.length > 0 && !filters.serviceTypes.includes(worker.role)) {
      return false
    }

    // Filter by price range
    if (worker.price < filters.priceRange[0] || worker.price > filters.priceRange[1]) {
      return false
    }

    // Filter by experience
    if (filters.experienceRanges.length > 0) {
      const years = parseInt(worker.experience?.split(' ')[0] || '0')
      const matchesExperience = filters.experienceRanges.some((range) => {
        if (range === "0-1 years") return years >= 0 && years <= 1
        if (range === "1-3 years") return years > 1 && years <= 3
        if (range === "3-5 years") return years > 3 && years <= 5
        if (range === "5+ years") return years > 5
        return false
      })
      if (!matchesExperience) return false
    }

    // Filter by availability
    if (filters.availability.length > 0 && !filters.availability.includes(worker.availability || '')) {
      return false
    }

    // Filter by rating
    if (filters.minRating !== null && worker.rating < filters.minRating) {
      return false
    }

    // Filter by verified status
    if (filters.verifiedOnly && !worker.verified) {
      return false
    }

    // Filter by location
    if (filters.location && worker.location !== filters.location) {
      return false
    }

    return true
  })
}

export function sortWorkers(
  workers: Worker[],
  sortBy: SortOption
): Worker[] {
  const sorted = [...workers]

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price)
    
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price)
    
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating)
    
    case "experience":
      return sorted.sort((a, b) => {
        const aYears = parseInt(a.experience?.split(' ')[0] || '0')
        const bYears = parseInt(b.experience?.split(' ')[0] || '0')
        return bYears - aYears
      })
    
    case "recommended":
    default:
      // Recommended: Sort by a combination of rating and reviews
      return sorted.sort((a, b) => {
        const aScore = a.rating * Math.log(a.reviews + 1)
        const bScore = b.rating * Math.log(b.reviews + 1)
        return bScore - aScore
      })
  }
}