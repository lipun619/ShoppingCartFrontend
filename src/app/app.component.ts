import { Component, OnInit } from '@angular/core';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService) { }

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
  cartProductList = [];
  totalsalesTax: Number;
  totalPrice: number;
  buyButtonClick: boolean = false;

  ngOnInit(): void {
    this.dataService.getAllProducts().subscribe(response => {
      this.productList = response;
    });
    if (localStorage.getItem('userCartData')) {
      this.cartProductList = JSON.parse(localStorage.getItem('userCartData'));
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

    localStorage.setItem('userCartData', JSON.stringify(this.cartProductList));
  }

  clearUserStateData() {
    if (localStorage.getItem('userCartData')) {
      localStorage.removeItem('userCartData');
      alert("User state data cleared, please refresh the page to see the change.");
    }

  }
}