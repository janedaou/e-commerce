import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CustomPipe } from '../../../shared/pipes/custom.pipe';

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

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All Products'; // Default category

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts() {
    this.http.get<Product[]>(`${environment.apiURL}`)
      .subscribe(data => {
        this.products = data;
      });
  }

  fetchCategories() {
    this.http.get<Product[]>(`${environment.apiURL}`)
      .subscribe(data => {
        const categories = data.map(product => product.category).filter(category => category !== undefined) as string[];
        this.categories = ['All Products', ...new Set(categories)]; // Add 'All Products' as first option
      });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category; // Update selectedCategory
    if (category === 'All Products') {
      this.fetchProducts(); // Fetch all products
    } else {
      this.http.get<Product[]>(`${environment.apiURL}/category/${category}`)
        .subscribe(data => {
          this.products = data;
        });
    }
  }

  sortProducts(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const sortOption = selectElement.value;

    switch (sortOption) {
      case 'price-low-high':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        this.products.sort((a, b) => b.price - a.price);
        break;
      case 'most-popular':
        this.products.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
    }
  }

  viewProductDetail(product: Product) {
    this.router.navigate(['/product-detail', product.id]);
  }
}
