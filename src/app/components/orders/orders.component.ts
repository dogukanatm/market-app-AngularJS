import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService, Order } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-4">
      <h2 class="mb-4">Siparişlerim</h2>

      <!-- Sipariş Yok -->
      <div *ngIf="orders.length === 0" class="text-center py-5">
        <i class="bi bi-box-seam display-1 text-muted"></i>
        <h4 class="mt-3">Henüz Siparişiniz Bulunmuyor</h4>
        <p class="text-muted">Siparişleriniz burada listelenecektir.</p>
        <a routerLink="/" class="btn btn-primary mt-3">
          Alışverişe Başla
        </a>
      </div>

      <!-- Sipariş Listesi -->
      <div *ngIf="orders.length > 0" class="row g-4">
        <div *ngFor="let order of orders" class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <div class="row align-items-center">
                <!-- Sipariş Durumu -->
                <div class="col-md-3">
                  <div [class]="getStatusClass(order.status)">
                    {{getStatusText(order.status)}}
                  </div>
                  <small class="text-muted d-block mt-2">
                    {{order.orderDate | date:'dd MMM yyyy HH:mm'}}
                  </small>
                </div>

                <!-- Sipariş Özeti -->
                <div class="col-md-6">
                  <h6 class="mb-2">Sipariş No: {{order.id}}</h6>
                  <p class="mb-1">{{order.items.length}} Ürün</p>
                  <p class="mb-0 text-primary">
                    {{order.total | currency:'TRY':'symbol-narrow':'1.2-2'}}
                  </p>
                </div>

                <!-- Kurye Durumu -->
                <div class="col-md-3 text-end">
                  <a [routerLink]="['/orders', order.id]" 
                     class="btn btn-outline-primary">
                    Detayları Görüntüle
                  </a>
                  <div *ngIf="order.status === 'shipped'" class="mt-2">
                    <small class="text-success">
                      <i class="bi bi-bicycle me-1"></i>
                      Kurye Yolda
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .status-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }
    .status-pending {
      background: #fff3cd;
      color: #856404;
    }
    .status-processing {
      background: #cce5ff;
      color: #004085;
    }
    .status-shipped {
      background: #d4edda;
      color: #155724;
    }
    .status-delivered {
      background: #d1e7dd;
      color: #0f5132;
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.id) {
      this.orders = this.orderService.getUserOrders(currentUser.id.toString());
    }
  }

  getStatusClass(status: string): string {
    return `status-badge status-${status}`;
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'pending': return 'Sipariş Alındı';
      case 'processing': return 'Hazırlanıyor';
      case 'shipped': return 'Kurye Yolda';
      case 'delivered': return 'Teslim Edildi';
      default: return status;
    }
  }
} 