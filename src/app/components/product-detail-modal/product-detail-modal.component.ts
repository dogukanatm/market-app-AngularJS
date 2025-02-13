import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{product.name}}</h4>
      <button type="button" class="close" (click)="modal.dismiss()">
        <span>&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <img [src]="product.imageUrl" class="img-fluid mb-3">
      <p>{{product.description}}</p>
      <p class="font-weight-bold">Fiyat: {{product.price}} ₺</p>
      <button class="btn btn-primary w-100" (click)="addToCart()">Sepete Ekle</button>
    </div>
  `
})
export class ProductDetailModalComponent {
  @Input() product!: Product;

  constructor(
    public modal: NgbActiveModal,
    private cartService: CartService
  ) {}

  addToCart(): void {
    this.cartService.addToCart(this.product);
    this.modal.close();
  }
} 