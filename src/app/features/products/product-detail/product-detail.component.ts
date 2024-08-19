import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProductDetail(+productId);
    }
  }

  fetchProductDetail(productId: number) {
    this.http.get<Product>(`${environment.apiURL}/${productId}`)
      .subscribe(data => {
        this.product = data;
        this.fetchSimilarProducts(data.category);
      });
  }

  fetchSimilarProducts(category?: string) {
    if (category) {
      this.http.get<Product[]>(`${environment.apiURL}/category/${category}`)
        .subscribe(data => {
          this.similarProducts = data.filter(p => p.id !== this.product?.id);
        });
    }
  }
}
