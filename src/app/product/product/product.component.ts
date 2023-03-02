import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: any;
  @Output() productAdded = new EventEmitter();
  @Output() productRemoved = new EventEmitter();
  addProductToCart(product) {
    this.productAdded.emit(product);
  }
  removeProductFromCart(product) {
    this.productRemoved.emit(product);
  }
}
