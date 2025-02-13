import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { OrderService, Order } from '../../services/order.service';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-4">
      <!-- Geri Butonu -->
      <div class="mb-4">
        <a routerLink="/orders" class="btn btn-outline-primary">
          <i class="bi bi-arrow-left me-2"></i>Siparişlerime Dön
        </a>
      </div>

      <!-- Sipariş Bulunamadı -->
      <div *ngIf="!order" class="text-center py-5">
        <i class="bi bi-exclamation-circle display-1 text-muted"></i>
        <h4 class="mt-3">Sipariş Bulunamadı</h4>
        <p class="text-muted">Bu sipariş numarasına ait bilgi bulunamadı.</p>
        <a routerLink="/orders" class="btn btn-primary mt-3">
          Siparişlerime Git
        </a>
      </div>

      <!-- Sipariş Detayları -->
      <div *ngIf="order" class="card border-0 shadow-sm">
        <div class="card-body">
          <h4 class="mb-4">Sipariş Takibi</h4>
          
          <!-- Durum Çubuğu -->
          <div class="order-status">
            <div class="status-item" 
                 [class.active]="order.status === 'pending'">
              <div class="status-icon">
                <i class="bi bi-check-circle-fill"></i>
              </div>
              <div class="status-text">
                <h6>Sipariş Alındı</h6>
                <small>{{order.orderDate | date:'medium'}}</small>
              </div>
            </div>

            <div class="status-item" 
                 [class.active]="order.status === 'processing'">
              <div class="status-icon">
                <i class="bi bi-box-seam"></i>
              </div>
              <div class="status-text">
                <h6>Hazırlanıyor</h6>
              </div>
            </div>

            <div class="status-item" 
                 [class.active]="order.status === 'shipped'">
              <div class="status-icon">
                <i class="bi bi-bicycle"></i>
              </div>
              <div class="status-text">
                <h6>Kurye Yolda</h6>
              </div>
            </div>

            <div class="status-item" 
                 [class.active]="order.status === 'delivered'">
              <div class="status-icon">
                <i class="bi bi-house-check"></i>
              </div>
              <div class="status-text">
                <h6>Teslim Edildi</h6>
              </div>
            </div>
          </div>

          <hr>

          <!-- Kurye Bilgileri -->
          <div *ngIf="order.status === 'shipped' && order.courierName" 
               class="courier-info mt-4">
            <h5>Kurye Bilgileri</h5>
            <div class="alert alert-success">
              <div class="d-flex align-items-center">
                <i class="bi bi-bicycle fs-3 me-3"></i>
                <div>
                  <h6 class="mb-1">{{order.courierName}}</h6>
                  <p class="mb-0" *ngIf="order.courierPhone">
                    <a [href]="'tel:' + order.courierPhone" class="text-success">
                      <i class="bi bi-telephone me-2"></i>{{order.courierPhone}}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sipariş Detayları -->
          <div class="order-details mt-4">
            <h5>Sipariş Detayları</h5>
            <div class="row mt-3">
              <div class="col-md-6">
                <p><strong>Sipariş No:</strong> {{order.id}}</p>
                <p><strong>Sipariş Tarihi:</strong> {{order.orderDate | date:'medium'}}</p>
                <p><strong>Toplam Tutar:</strong> {{order.total | currency:'TRY':'symbol-narrow':'1.2-2'}}</p>
                <p><strong>Ödeme Yöntemi:</strong> {{order.paymentMethod === 'card' ? 'Kredi Kartı' : 'Kapıda Ödeme'}}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Teslimat Adresi:</strong></p>
                <p>{{order.address}}</p>
              </div>
            </div>

            <!-- Ürün Listesi -->
            <div class="mt-4">
              <h6>Sipariş Edilen Ürünler</h6>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Ürün</th>
                      <th>Adet</th>
                      <th class="text-end">Fiyat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of order.items">
                      <td>{{item.product.name}}</td>
                      <td>{{item.quantity}}</td>
                      <td class="text-end">
                        {{item.product.price * item.quantity | currency:'TRY':'symbol-narrow':'1.2-2'}}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .order-status {
      display: flex;
      justify-content: space-between;
      position: relative;
      margin: 2rem 0;
    }
    .status-item {
      text-align: center;
      position: relative;
      z-index: 1;
      flex: 1;
      padding: 0 10px;
    }
    .status-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-size: 1.5rem;
      color: #adb5bd;
      transition: all 0.3s ease;
    }
    .status-item.active .status-icon {
      background: #0d6efd;
      color: white;
      transform: scale(1.1);
    }
    .order-status::before {
      content: '';
      position: absolute;
      top: 24px;
      left: 10%;
      right: 10%;
      height: 2px;
      background: #dee2e6;
      z-index: 0;
    }
    .table {
      margin-bottom: 0;
    }
    .table th {
      border-top: none;
    }
  `]
})
export class OrderTrackingComponent implements OnInit {
  order?: Order;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.order = this.orderService.getOrderById(orderId);
    }
  }
} 