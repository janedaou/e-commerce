import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {}

  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: any) {
    // Check if the item already exists in the cart
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // Add product with a default quantity of 1
      this.cartItems.push({ ...product, quantity: 1 });
    }
    console.log(`${product.title} added to cart.`);
  }

  removeFromCart(product: any) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
  }

  updateQuantity(productId: number, quantity: number) {
    const cartItem = this.cartItems.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity = quantity;
      if (cartItem.quantity <= 0) {
        this.removeFromCart(cartItem);
      }
    }
  }

  clearCart() {
    this.cartItems = [];
  }

  applyPromoCode(code: string): number {
    let discount = 0;
    if (code === 'newCustomer20') {
      discount = 0.2; // 20% discount for new customers
    }
    return discount;
  }
}
