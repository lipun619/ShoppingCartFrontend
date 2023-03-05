import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './login-signup/login-signup/login-signup.component';
import { ProductMenuComponent } from './product-menu/product-menu/product-menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'login-signup', pathMatch: 'full' },
  { path: 'login-signup', component: LoginSignupComponent },
  { path: 'products', component: ProductMenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
