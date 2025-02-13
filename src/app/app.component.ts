import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CartService, CartItem } from './services/cart.service';

@Component({
  selector: 'app-root',
  template: `
    <header class="main-header">
      <div class="container">
        <!-- Sol: Logo ve Arama -->
        <div class="left-section">
          <a routerLink="/" class="logo" title="Ana Sayfaya Dön">
            <i class="bi bi-shop"></i>
            <span>MarketApp</span>
          </a>
        </div>

        <!-- Orta: Ana Menü -->
        <div class="center-section">
          <nav class="main-nav">
            <a routerLink="/" class="nav-link" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
              <i class="bi bi-grid"></i>
              <span>Market</span>
            </a>
            <a routerLink="/cafeteria" class="nav-link" routerLinkActive="active">
              <i class="bi bi-cup-hot"></i>
              <span>Kafeterya</span>
            </a>
            <a routerLink="/orders" class="nav-link" routerLinkActive="active" *ngIf="isLoggedIn">
              <i class="bi bi-box-seam"></i>
              <span>Siparişlerim</span>
            </a>
          </nav>
        </div>

        <!-- Sağ: Sepet ve Kullanıcı -->
        <div class="right-section">
          <a routerLink="/cart" class="cart-btn">
            <i class="bi bi-basket2"></i>
            <span class="cart-text">Sepetim</span>
            <div class="cart-count" *ngIf="cartItemCount > 0">
              {{ cartItemCount }}
            </div>
          </a>

          <a *ngIf="!isLoggedIn" routerLink="/login" class="auth-btn">
            <i class="bi bi-person"></i>
            <span>Giriş Yap</span>
          </a>

          <div *ngIf="isLoggedIn" class="user-menu" ngbDropdown>
            <button class="user-btn" ngbDropdownToggle>
              <i class="bi bi-person-circle"></i>
              <span>{{username}}</span>
            </button>
            <div ngbDropdownMenu class="dropdown-menu">
              <a ngbDropdownItem routerLink="/profile">
                <i class="bi bi-person"></i> Hesabım
              </a>
              <div class="dropdown-divider"></div>
              <a ngbDropdownItem (click)="logout()">
                <i class="bi bi-box-arrow-right"></i> Çıkış
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .main-header {
      background: #2563eb;
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 2rem;
      flex: 1;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
      text-decoration: none;
      white-space: nowrap;
      transition: all 0.2s;
    }

    .logo:hover {
      transform: translateY(-2px);
      opacity: 0.9;
    }

    .search-box {
      position: relative;
      flex: 1;
      max-width: 500px;
    }

    .search-box input {
      width: 100%;
      padding: 0.8rem 1rem 0.8rem 2.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      background: rgba(255,255,255,0.1);
      color: white;
      transition: all 0.3s;
    }

    .search-box input::placeholder {
      color: rgba(255,255,255,0.8);
    }

    .search-box input:focus {
      outline: none;
      background: rgba(255,255,255,0.2);
    }

    .search-box i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: white;
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .cart-btn, .auth-btn, .user-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.7rem 1.2rem;
      border: none;
      border-radius: 8px;
      background: rgba(255,255,255,0.1);
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
    }

    .cart-btn {
      position: relative;
    }

    .cart-btn:hover, .auth-btn:hover, .user-btn:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-2px);
    }

    .badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #ef4444;
      color: white;
      font-size: 0.8rem;
      padding: 0.2rem 0.6rem;
      border-radius: 50px;
      font-weight: 600;
    }

    .dropdown-menu {
      margin-top: 0.5rem;
      min-width: 200px;
      border: none;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 0.5rem;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.7rem 1rem;
      border-radius: 6px;
      color: #4b5563;
      transition: all 0.2s;
    }

    .dropdown-item:hover {
      background: #f3f4f6;
    }

    .dropdown-item.text-danger {
      color: #ef4444;
    }

    .center-section {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .main-nav {
      display: flex;
      gap: 1.5rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255,255,255,0.9);
      text-decoration: none;
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      transition: all 0.2s;
    }

    .nav-link i {
      font-size: 1.2rem;
    }

    .nav-link:hover {
      color: white;
      background: rgba(255,255,255,0.1);
      transform: translateY(-2px);
    }

    .nav-link.active {
      color: white;
      background: rgba(255,255,255,0.2);
    }

    @media (max-width: 768px) {
      .container {
        flex-wrap: wrap;
        gap: 1rem;
        padding: 1rem;
      }

      .center-section {
        order: 3;
        width: 100%;
      }

      .main-nav {
        width: 100%;
        justify-content: center;
      }

      .nav-link {
        flex: 1;
        justify-content: center;
      }

      .left-section {
        width: 100%;
        flex-direction: column;
        gap: 1rem;
      }

      .search-box {
        width: 100%;
        max-width: none;
      }

      .right-section {
        width: 100%;
        justify-content: space-between;
      }

      .cart-text {
        display: none;
      }

      .cart-btn, .auth-btn, .user-btn {
        padding: 0.7rem;
      }
    }
  `],
  standalone: true,
  imports: [RouterModule, NgbModule, CommonModule]
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username = '';
  cartItemCount: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    // Oturum durumunu takip et
    this.authService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
        if (isAuthenticated) {
          const user = this.authService.getCurrentUser();
          this.username = user?.username || '';
        }
      }
    );

    // Sepet durumunu takip et
    this.cartService.getItems().subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
