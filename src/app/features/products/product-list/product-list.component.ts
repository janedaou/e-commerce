import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<Product[]>('https://fakestoreapi.com/products')
      .subscribe(data => {
        this.products = data;
      });
  }

  viewProductDetail(product: Product) {
    this.router.navigate(['/product-detail', product.id]);
  }

  previousPage() {
    // Logic to go to the previous page
  }

  nextPage() {
    // Logic to go to the next page
  }

  goToPage(page: number) {
    // Logic to go to a specific page
  }
}
