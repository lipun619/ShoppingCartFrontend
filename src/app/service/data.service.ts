import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const REPORTS_API_BASE_URI = 'https://localhost:7193/api/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts() {
    return this.httpClient.get<any>(
      REPORTS_API_BASE_URI + 'Product/GetAllProducts'
    );
  }

  calculateSalesTax(productList) {
    productList.map(product => {
      product.salesTax = this.salesTaxCalculate(product),
        product.totalPrice = this.productWiseTotalPriceCalculate(product)
    });
  }

  salesTaxCalculate(product) {
    const basicSalesTaxRate = 0.1; // 10%
    const importDutyRate = 0.05; // 5%
    let salesTax = 0;
    if (!this.isExempt(product)) {
      salesTax += this.roundToNearestFiveCents(product.price * basicSalesTaxRate);
    }
    if (product.isImported) {
      salesTax += this.roundToNearestFiveCents(product.price * importDutyRate);
    }
    return salesTax;
  }

  private isExempt(product): boolean {
    let check = product.name.toLowerCase().includes('book')
      || product.name.toLowerCase().includes('chocolate')
      || product.name.toLowerCase().includes('chocolates')
      || product.name.toLowerCase().includes('pills')
      || product.name.toLowerCase().includes('medical');
    return check;
  }

  private roundToNearestFiveCents(amount: number): number {
    const roundedAmount = Math.ceil(amount / 0.05) * 0.05;
    return Number(roundedAmount.toFixed(2));
  }

  productWiseTotalPriceCalculate(product) {
    let totalPrice = 0;
    totalPrice = Number((product.price * product.num + product.salesTax).toFixed(2));
    return totalPrice;
  }

  totalSaleTaxes(productList) {
    return productList.reduce((acc, prod) => acc += prod.salesTax, 0)
  }

  totalPrice(productList) {
    return productList.reduce((acc, prod) => acc += prod.totalPrice, 0)
  }
}
