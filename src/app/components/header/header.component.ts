import { Component, OnInit } from '@angular/core';
import { CartNotificationService } from '../../services/cart-notification.service';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      
      <div class="nav-item">
        <a class="nav-link" routerLink="/cart">
          Sepet
          <span class="badge badge-primary" *ngIf="cartItemCount > 0">{{cartItemCount}}</span>
        </a>
      </div>
    </nav>
  `
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private cartNotificationService: CartNotificationService) {}

  ngOnInit() {
    this.cartNotificationService.cartItemCount$.subscribe(
      count => this.cartItemCount = count
    );
  }
} 