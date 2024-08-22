import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { CartListComponent } from './features/cart/cart-list/cart-list.component';
import { OrderListComponent } from './features/orders/order-list/order-list.component';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { AccountComponent } from './features/account/account.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupService } from './features/auth/signup/signup.service';
import { CustomPipe } from './shared/pipes/custom.pipe';
import { AdminModule } from './admin/admin.module';
import { ProfileComponent } from './features/auth/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartListComponent,
    OrderListComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    SignupComponent,
    LoginComponent,
    AccountComponent,
    CustomPipe,
    ProfileComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AdminModule
  ],
  providers: [SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
