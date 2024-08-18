import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent {
  cartItems = [
    {
      name: 'Gradient Graphic T-shirt',
      size: 'Large',
      color: 'White',
      price: 145,
      quantity: 1,
      imageUrl: 'assets/images/product-9.png'
    },
    {
      name: 'Checkered Shirt',
      size: 'Medium',
      color: 'Red',
      price: 180,
      quantity: 1,
      imageUrl: 'assets/images/product-3.png'
    },
    {
      name: 'Skinny Fit Jeans',
      size: 'Large',
      color: 'Blue',
      price: 240,
      quantity: 1,
      imageUrl: 'assets/images/product-2.png'
    }
  ];

  subtotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  discountPercent = 20;
  discount = this.subtotal * (this.discountPercent / 100);
  deliveryFee = 15;
  total = this.subtotal - this.discount + this.deliveryFee;
  promoCode: string = '';

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateSummary();
    }
  }

  incrementQuantity(item: any) {
    item.quantity++;
    this.calculateSummary();
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i !== item);
    this.calculateSummary();
  }

  calculateSummary() {
    this.subtotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    this.discount = this.subtotal * (this.discountPercent / 100);
    this.total = this.subtotal - this.discount + this.deliveryFee;
  }

  applyPromoCode() {
    // Logic to apply promo code
  }
}
