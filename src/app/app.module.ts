import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartProductComponent } from './cart-product/cart-product/cart-product.component';
import { ProductListComponent } from './product-list/product-list/product-list.component';
import { ProductComponent } from './product/product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    CartProductComponent,
    ProductListComponent,
    ProductComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
