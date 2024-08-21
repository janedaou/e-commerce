import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'] // Corrected typo: `styleUrl` -> `styleUrls`
})
export class HomepageComponent implements OnInit {
  mensClothing: any[] = [];
  womensClothing: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

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

  viewProductDetail(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}
