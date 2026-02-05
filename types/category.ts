export interface Category {
  id: number;
  key: string;        // "nanny", "maid", "driver"
  label: string;      // "Nanny", "Maid", "Driver"
  description?: string;
  icon?: string;      // emoji or icon name
}
