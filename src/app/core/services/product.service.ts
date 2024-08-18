import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Product {
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

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = `${environment.apiURL}`;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiURL}/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/category/${category}`);
  }

  sortProductsByPriceLowToHigh(products: Product[]): Product[] {
    return products.sort((a, b) => a.price - b.price);
  }

  sortProductsByPriceHighToLow(products: Product[]): Product[] {
    return products.sort((a, b) => b.price - a.price);
  }

  sortProductsByPopularity(products: Product[]): Product[] {
    return products.sort((a, b) => b.rating.rate - a.rating.rate);
  }
}
