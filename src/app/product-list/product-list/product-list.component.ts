import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  
  @Input() products: any[];
  @Output() productAdded = new EventEmitter();
  @Output() productRemoved = new EventEmitter();

  addProductToCart(product) {
    this.productAdded.emit(product);
  }
  removeProductFromCart(product) {
    this.productRemoved.emit(product);
  }
}
