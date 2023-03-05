import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartProductComponent } from './cart-product/cart-product/cart-product.component';
import { ProductListComponent } from './product-list/product-list/product-list.component';
import { ProductComponent } from './product/product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart/shopping-cart.component';
import { LoginSignupComponent } from './login-signup/login-signup/login-signup.component';
import { ProductMenuComponent } from './product-menu/product-menu/product-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    CartProductComponent,
    ProductListComponent,
    ProductComponent,
    ShoppingCartComponent,
    LoginSignupComponent,
    ProductMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
