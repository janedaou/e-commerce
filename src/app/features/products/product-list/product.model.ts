export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
  };
  description?: string;
  category?: string;
}
