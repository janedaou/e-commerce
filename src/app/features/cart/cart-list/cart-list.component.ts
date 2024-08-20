import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  cartItems: any[] = [];
  subtotal: number = 0;
  discountPercent: number = 0;
  discount: number = 0;
  deliveryFee: number = 15;
  total: number = 0;
  promoCode: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateSummary();
  }

  decrementQuantity(item: any) {
    this.cartService.updateQuantity(item.id, item.quantity - 1);
    this.cartItems = this.cartService.getCartItems(); // Refresh the cart items
    this.calculateSummary();
  }

  incrementQuantity(item: any) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
    this.cartItems = this.cartService.getCartItems(); // Refresh the cart items
    this.calculateSummary();
  }

  removeItem(item: any) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems(); // Refresh the cart items
    this.calculateSummary();
  }

  calculateSummary() {
    this.subtotal = this.cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    this.discount = this.subtotal * (this.discountPercent / 100);
    this.total = this.subtotal - this.discount + this.deliveryFee;
  }

  applyPromoCode() {
    this.discountPercent = this.cartService.applyPromoCode(this.promoCode) * 100;
    this.calculateSummary();
  }
}
