export type WorkerCategory =
  | "nanny"
  | "maid"
  | "driver"
  | "caregiver"
  | "cook";

export interface Worker {
    id: number,
    name: string,
    role: string,
    rating: number,
    reviews: number,
    price: number,
    image: string,
    verified: boolean,
    experience: string,
    location: string,
    availability: string,
    languages: string[],
    skills: string[],
}
