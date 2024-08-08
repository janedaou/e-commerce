import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { CartListComponent } from './features/cart/cart-list/cart-list.component';
import { CheckoutComponent } from './features/checkout/checkout/checkout.component';
import { OrderListComponent } from './features/orders/order-list/order-list.component';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartListComponent,
    CheckoutComponent,
    OrderListComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterOutlet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
