import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private ordersUrl = 'https://fakestoreapi.com/carts';
  private productsUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getRecentActivities(): Observable<any[]> {
    return this.http.get<any[]>(this.ordersUrl).pipe(
      switchMap((orders) => {
        return this.http.get<any[]>(this.productsUrl).pipe(
          map((products) => {
            const activities = orders.map((order) => ({
              action: `Order #${order.id} was placed.`,
              timestamp: new Date(order.date),
            }));
            const productActivities = products.map((product) => ({
              action: `Product "${product.title}" was added to the catalog.`,
              timestamp: new Date(),
            }));
            return [...activities, ...productActivities];
          })
        );
      })
    );
  }
}
