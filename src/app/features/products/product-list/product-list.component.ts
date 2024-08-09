import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [
    { name: 'Gradient Graphic T-shirt', price: 145, image: 'assets/product1.png', rating: 3.5 },
    { name: 'Polo with Tipping Details', price: 180, image: 'assets/product2.png', rating: 4.5, originalPrice: 200, discount: 10 },
    { name: 'Skinny Fit Jeans', price: 240, image: 'assets/product3.png', rating: 3.5, originalPrice: 260, discount: 20 },
    // Add more products here
  ];

  pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor() { }

  ngOnInit(): void { }

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
