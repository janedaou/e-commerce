import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CartService } from '../../../core/services/cart.service';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
  };
  category?: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  cartService = inject(CartService);

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  product: Product | undefined;
  similarProducts: Product[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = +params.get('id')!;
      if (productId) {
        this.fetchProductDetail(productId);
      }
    });
  }

  fetchProductDetail(productId: number) {
    this.http.get<Product>(`${environment.apiURL}/${productId}`)
      .subscribe(data => {
        this.product = data;
        if (this.product && this.product.category) {
          this.fetchSimilarProducts(this.product.category);
        }
      });
  }

  fetchSimilarProducts(category: string) {
    this.http.get<Product[]>(`${environment.apiURL}/category/${category}`)
      .subscribe(data => {
        this.similarProducts = data.filter(p => p.id !== this.product?.id);
      });
  }

  viewProductDetail(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  /*addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.title} has been added to the cart!`);
  }*/
}
