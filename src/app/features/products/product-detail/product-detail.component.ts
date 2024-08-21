import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service'; // Import AuthService

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

  product: Product | undefined;
  similarProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cartService: CartService,
    private authService: AuthService // Inject AuthService
  ) { }

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

  addToCart(product: Product) {
    if (this.authService.isLoggedIn()) {
      this.cartService.addToCart(product);
      this.router.navigate(['/cart']); // Redirect to cart list after adding to cart
    } else {
      localStorage.setItem('redirectUrl', this.router.url); // Save the current URL
      this.router.navigate(['/account']);
    }
  }
}
