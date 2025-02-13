import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container py-4">
      <!-- Boş Sepet -->
      <div *ngIf="cartItems.length === 0" class="empty-cart">
        <i class="bi bi-cart-x"></i>
        <h3>Sepetiniz Boş</h3>
        <p>Alışverişe başlamak için ürün ekleyin</p>
        <a routerLink="/" class="btn btn-primary">
          <i class="bi bi-arrow-left me-2"></i>Alışverişe Başla
        </a>
      </div>
        
      <!-- Dolu Sepet -->
      <div *ngIf="cartItems.length > 0" class="cart-content">
        <div class="row">
          <!-- Sol Taraf - Ürünler -->
          <div class="col-lg-8">
            <div class="cart-items">
              <div *ngFor="let item of cartItems" class="cart-item">
                <div class="item-image">
                  <img [src]="item.product.imageUrl" [alt]="item.product.name">
                </div>
                <div class="item-details">
                  <h4>{{item.product.name}}</h4>
                  <p class="text-muted">{{item.product.description}}</p>
                  <div class="item-controls">
                    <div class="quantity-controls">
                      <button (click)="updateQuantity(item, item.quantity - 1)"
                              [disabled]="item.quantity <= 1"
                              class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-dash"></i>
                      </button>
                      <span>{{item.quantity}}</span>
                      <button (click)="updateQuantity(item, item.quantity + 1)"
                              [disabled]="item.quantity >= item.product.stock"
                              class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                    <button (click)="removeFromCart(item)" 
                            class="btn btn-sm btn-outline-danger">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
                <div class="item-price">
                  <div class="price">{{item.product.price * item.quantity}} ₺</div>
                  <small class="text-muted">{{item.product.price}} ₺/adet</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Sağ Taraf - Özet -->
          <div class="col-lg-4">
            <div class="cart-summary">
              <h3>Sipariş Özeti</h3>
              
              <!-- Fiyat Detayları -->
              <div class="summary-item">
                <span>Ara Toplam</span>
                <span>{{subtotal}} ₺</span>
              </div>
              <div class="summary-item">
                <span>Kargo</span>
                <span *ngIf="shipping > 0">{{shipping}} ₺</span>
                <span *ngIf="shipping === 0" class="text-success">Ücretsiz</span>
              </div>
              <div class="summary-total">
                <span>Toplam</span>
                <span>{{total}} ₺</span>
              </div>

              <!-- Teslimat Adresi -->
              <div class="form-group mt-4">
                <label>Teslimat Adresi</label>
                <textarea 
                  class="form-control" 
                  rows="3" 
                  [(ngModel)]="address"
                  placeholder="Teslimat adresinizi girin">
                </textarea>
              </div>

              <!-- Ödeme Yöntemi -->
              <div class="payment-methods mt-4">
                <label>Ödeme Yöntemi</label>
                <div class="form-check">
                  <input class="form-check-input" type="radio" 
                         [(ngModel)]="paymentMethod" value="cash" 
                         id="cashPayment">
                  <label class="form-check-label" for="cashPayment">
                    Kapıda Ödeme
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" 
                         [(ngModel)]="paymentMethod" value="card" 
                         id="cardPayment">
                  <label class="form-check-label" for="cardPayment">
                    Kredi Kartı
                  </label>
                </div>
              </div>

              <!-- Kredi Kartı Bilgileri -->
              <div *ngIf="paymentMethod === 'card'" class="card-details mt-3">
                <div class="form-group">
                  <label>Kart Numarası</label>
                  <input type="text" class="form-control" 
                         [(ngModel)]="cardNumber" 
                         placeholder="1234 5678 9012 3456">
                </div>
                <div class="row mt-3">
                  <div class="col-6">
                    <label>Son Kullanma</label>
                    <input type="text" class="form-control" 
                           [(ngModel)]="cardExpiry" 
                           placeholder="MM/YY">
                  </div>
                  <div class="col-6">
                    <label>CVV</label>
                    <input type="text" class="form-control" 
                           [(ngModel)]="cardCvv" 
                           placeholder="123">
                  </div>
                </div>
              </div>

              <button class="btn btn-primary w-100 mt-4"
                      [disabled]="!isValid"
                      (click)="checkout()">
                Siparişi Tamamla
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .empty-cart {
      text-align: center;
      padding: 3rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .empty-cart i {
      font-size: 4rem;
      color: #dee2e6;
      margin-bottom: 1rem;
    }

    .empty-cart h3 {
      margin-bottom: 0.5rem;
      color: #343a40;
    }

    .empty-cart p {
      color: #6c757d;
      margin-bottom: 1.5rem;
    }

    .cart-items {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .cart-item {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #e9ecef;
    }

    .cart-item:last-child {
      border-bottom: none;
    }

    .item-image {
      width: 100px;
      height: 100px;
      margin-right: 1.5rem;
    }

    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }

    .item-details {
      flex: 1;
    }

    .item-details h4 {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      color: #343a40;
    }

    .item-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 1rem;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      padding: 0.25rem;
    }

    .quantity-controls span {
      min-width: 2rem;
      text-align: center;
      font-weight: 500;
    }

    .item-price {
      text-align: right;
      min-width: 120px;
    }

    .price {
      font-size: 1.2rem;
      font-weight: 600;
      color: #0d6efd;
    }

    .cart-summary {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 1.5rem;
      position: sticky;
      top: 1rem;
    }

    .cart-summary h3 {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
      color: #343a40;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      color: #495057;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      margin: 1.5rem 0;
      padding-top: 1rem;
      border-top: 2px solid #e9ecef;
      font-weight: 600;
      font-size: 1.1rem;
      color: #343a40;
    }

    @media (max-width: 992px) {
      .cart-summary {
        margin-top: 1.5rem;
        position: static;
      }
    }

    @media (max-width: 768px) {
      .cart-item {
        flex-direction: column;
        text-align: center;
      }

      .item-image {
        margin-right: 0;
        margin-bottom: 1rem;
      }

      .item-controls {
        justify-content: center;
      }

      .item-price {
        margin-top: 1rem;
        text-align: center;
      }
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-control {
      border-radius: 8px;
      border: 1px solid #dee2e6;
      padding: 0.5rem;
    }

    .payment-methods {
      border-radius: 8px;
      padding: 1rem;
      background: #f8f9fa;
    }

    .form-check {
      margin-bottom: 0.5rem;
    }

    .card-details {
      padding: 1rem;
      border-radius: 8px;
      background: #f8f9fa;
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal = 0;
  shipping = 0;
  total = 0;
  
  // Ödeme bilgileri
  address = '';
  paymentMethod = 'cash';
  cardNumber = '';
  cardExpiry = '';
  cardCvv = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  private calculateTotals(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0);
    this.shipping = this.subtotal >= 150 ? 0 : 20;
    this.total = this.subtotal + this.shipping;
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity >= 1 && quantity <= item.product.stock) {
      this.cartService.updateQuantity(item.product, quantity);
      this.calculateTotals();
    }
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item.product);
    this.calculateTotals();
  }

  get isValid(): boolean {
    if (!this.address || this.cartItems.length === 0) return false;
    if (this.paymentMethod === 'card') {
      return Boolean(this.cardNumber && this.cardExpiry && this.cardCvv);
    }
    return true;
  }

  checkout(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      this.router.navigate(['/login']);
      return;
    }

    const order = this.orderService.createOrder({
      items: this.cartItems,
      total: this.total,
      status: 'pending',
      userId: currentUser.id.toString(),
      address: this.address,
      paymentMethod: this.paymentMethod
    });

    this.cartService.clearCart();
    this.router.navigate(['/orders', order.id]);
  }
}
