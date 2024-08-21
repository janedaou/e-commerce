import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>(this.getCartItemsFromStorage());
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartItems: any[] = [];

  constructor() {
    this.cartItems = this.getCartItemsFromStorage();
    this.cartItemsSubject.next(this.cartItems);
  }

  private getCartItemsFromStorage(): any[] {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
  }

  private saveCartItemsToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: any) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItemsToStorage();
    console.log(`${product.title} added to cart.`);
  }

  removeFromCart(product: any) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItemsToStorage();
  }

  updateQuantity(productId: number, quantity: number) {
    const cartItem = this.cartItems.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity = quantity;
      if (cartItem.quantity <= 0) {
        this.removeFromCart(cartItem);
      }
    }
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItemsToStorage();
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItemsToStorage();
  }

  applyPromoCode(code: string): number {
    let discount = 0;
    if (code === 'newCustomer20') {
      discount = 0.2; // 20% discount for new customers
    }
    return discount;
  }
}
