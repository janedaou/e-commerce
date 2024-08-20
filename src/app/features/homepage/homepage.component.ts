import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  mensClothing: any[] = [];
  womensClothing: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductsByCategory("men's clothing").subscribe(
      (products) => {
        this.mensClothing = products.slice(0, 4); // Limit to 4 products
      },
      (error) => {
        console.error('Error fetching men\'s clothing:', error);
      }
    );

    this.productService.getProductsByCategory("women's clothing").subscribe(
      (products) => {
        this.womensClothing = products.slice(0, 4); // Limit to 4 products
      },
      (error) => {
        console.error('Error fetching women\'s clothing:', error);
      }
    );
  }
}