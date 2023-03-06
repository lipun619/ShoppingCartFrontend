import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Models/User';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss']
})
export class ProductMenuComponent implements OnInit {
  constructor(private dataService: DataService, private router : Router) { }

  // productList = [
  //   { name: 'Book', price: 12.49, isImported: false, salesTax: 0, totalPrice: 0 },
  //   { name: 'Music CD', price: 14.99, isImported: false, salesTax: 0, totalPrice: 0 },
  //   { name: 'Chocolate Bar', price: 0.85, isImported: false, salesTax: 0, totalPrice: 0 },
  //   { name: 'Imported Box Of Chocolates', price: 10.00, isImported: true, salesTax: 0, totalPrice: 0 },
  //   { name: 'Imported Bottle Of Perfume', price: 47.50, isImported: true, salesTax: 0, totalPrice: 0 },
  //   { name: 'Bottle Of Perfume', price: 18.99, isImported: false, salesTax: 0, totalPrice: 0 },
  //   { name: 'Packet Of Headache Pills', price: 9.75, isImported: false, salesTax: 0, totalPrice: 0 },
  //   { name: 'Box Of Imported Chocolates', price: 11.25, isImported: true, salesTax: 0, totalPrice: 0 },
  // ];

  productList = [];
  currentUserData: User;
  cartProductList = [];
  totalsalesTax: Number;
  totalPrice: number;
  buyButtonClick: boolean = false;
  ifLoggedIn: boolean = false;
  currentUser: any;
  userCartData: User[];

  ngOnInit(): void {
    this.userCartData = [];
    this.dataService.getAllProducts().subscribe(response => {
      this.productList = response;
    });

    //Used session storage for retriving current user information
    if (sessionStorage.getItem('currentUser')) {
      this.currentUser = sessionStorage.getItem('currentUser');
    }

    //Used local storage to retrive current user cart data if present
    if (localStorage.getItem('userCartData')) {
      this.userCartData = JSON.parse(localStorage.getItem('userCartData'));
      this.currentUserData = this.userCartData.find(user => user.email == this.currentUser);
      if (this.currentUserData) {
        this.cartProductList = this.userCartData.find(user => user.email == this.currentUser)?.product;
      } else {
        this.currentUserData = new User();
        this.currentUserData.email = this.currentUser;
      }
    } else {
      this.currentUserData = new User();
      this.currentUserData.email = this.currentUser;
    }
  }

  addProductToCart(product) {
    this.buyButtonClick = false;
    const productExistInCart = this.cartProductList.find(({ name }) => name === product.name);
    if (!productExistInCart) {
      this.cartProductList.push({ ...product, num: 1 });
      return;
    }
    productExistInCart.num += 1;
  }

  removeProduct(product) {
    this.buyButtonClick = false;
    const productExistInCart = this.cartProductList.find(({ name }) => name === product.name);
    if (productExistInCart && productExistInCart.num > 0) {
      productExistInCart.num -= 1;
      if (productExistInCart.num == 0) {
        this.cartProductList = this.cartProductList.filter(({ name }) => name !== product.name);
      }
      return;
    } else {
      this.cartProductList = this.cartProductList.filter(({ name }) => name !== product.name);
    }
  }

  buyProduct() {
    this.buyButtonClick = true;
    this.dataService.calculateSalesTax(this.cartProductList);
    this.totalsalesTax = this.dataService.totalSaleTaxes(this.cartProductList);
    this.totalPrice = this.dataService.totalPrice(this.cartProductList);

    this.currentUserData.product = this.cartProductList;
    if (this.userCartData.find(user => user.email == this.currentUser)) {
      this.userCartData.find(user => user.email == this.currentUser).product = this.currentUserData.product
    } else {
      this.userCartData.push(this.currentUserData);
    }
    
    //After user has added or updated the cart storing his cart info to local storage.
    localStorage.setItem('userCartData', JSON.stringify(this.userCartData));
  }

  login() {
    this.router.navigate(['login-signup']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login-signup']);
  }
}
