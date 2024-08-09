export interface Product {
    name: string;
    price: number;
    image: string;
    rating: number;
    originalPrice?: number; // Optional
    discount?: number; // Optional
  }
  