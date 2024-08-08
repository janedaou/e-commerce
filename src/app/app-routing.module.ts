import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { CartListComponent } from './features/cart/cart-list/cart-list.component';
import { CheckoutComponent } from './features/checkout/checkout/checkout.component';
import { OrderListComponent } from './features/orders/order-list/order-list.component';
import { HomepageComponent } from './features/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'homepage', component: HomepageComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartListComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'orders', component: OrderListComponent }
  // { path: 'orders/:id', component: OrderDetailComponent },
 // { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/homepage' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
