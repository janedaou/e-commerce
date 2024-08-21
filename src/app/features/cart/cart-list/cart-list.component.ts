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
  promoCodeError: string = '';

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
    this.subtotal = this.roundToTwoDecimalPlaces(
      this.cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0)
    );
    this.discount = this.roundToTwoDecimalPlaces(this.subtotal * (this.discountPercent / 100));
    this.total = this.roundToTwoDecimalPlaces(this.subtotal - this.discount + this.deliveryFee);
  }

  applyPromoCode() {
    const discount = this.cartService.applyPromoCode(this.promoCode);
    if (discount > 0) {
      this.discountPercent = discount * 100;
      this.promoCodeError = '';
    } else {
      this.promoCodeError = 'Incorrect promo code';
      this.discountPercent = 0;
    }
    this.calculateSummary();
  }

  isApplyDisabled(): boolean {
    return this.promoCode.trim() === '';
  }

  private roundToTwoDecimalPlaces(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
