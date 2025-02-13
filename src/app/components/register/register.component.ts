import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-lg register-card">
            <div class="card-header bg-primary text-white text-center py-3">
              <h2 class="mb-0">Kayıt Ol</h2>
            </div>
            <div class="card-body p-4">
              <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="name" class="form-label">Ad</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="name" 
                      name="name" 
                      [(ngModel)]="user.name" 
                      required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="surname" class="form-label">Soyad</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="surname" 
                      name="surname" 
                      [(ngModel)]="user.surname" 
                      required>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">E-posta</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-envelope"></i>
                    </span>
                    <input 
                      type="email" 
                      class="form-control" 
                      id="email" 
                      name="email" 
                      [(ngModel)]="user.email" 
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      #email="ngModel">
                  </div>
                  <div *ngIf="email.invalid && (email.dirty || email.touched)" 
                       class="text-danger small mt-1">
                    <i class="bi bi-exclamation-circle"></i> Geçerli bir e-posta adresi giriniz
                  </div>
                </div>

                <div class="mb-3">
                  <label for="username" class="form-label">Kullanıcı Adı</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-person"></i>
                    </span>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="username" 
                      name="username" 
                      [(ngModel)]="user.username" 
                      required>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Şifre</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-lock"></i>
                    </span>
                    <input 
                      type="password" 
                      class="form-control" 
                      id="password" 
                      name="password" 
                      [(ngModel)]="user.password" 
                      required>
                  </div>
                </div>

                <div class="mb-4">
                  <label for="phoneNumber" class="form-label">Telefon</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-telephone"></i>
                    </span>
                    <input 
                      type="tel" 
                      class="form-control" 
                      id="phoneNumber" 
                      name="phoneNumber" 
                      [(ngModel)]="user.phoneNumber" 
                      required
                      pattern="[0-9]{10}"
                      #phone="ngModel"
                      placeholder="5XX XXX XX XX">
                  </div>
                  <div *ngIf="phone.invalid && (phone.dirty || phone.touched)" 
                       class="text-danger small mt-1">
                    <i class="bi bi-exclamation-circle"></i> 10 haneli telefon numarası giriniz
                  </div>
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary w-100 py-2"
                  [disabled]="!registerForm.form.valid">
                  <i class="bi bi-person-plus me-2"></i>
                  Kayıt Ol
                </button>

                <div class="text-center mt-3">
                  <p class="text-muted">
                    Zaten hesabınız var mı? 
                    <a routerLink="/login" class="text-primary">Giriş Yap</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-card {
      margin-top: 2rem;
      margin-bottom: 2rem;
      border: none;
      border-radius: 15px;
    }

    .card-header {
      border-radius: 15px 15px 0 0 !important;
    }

    .form-control {
      padding: 0.75rem;
      border-radius: 8px;
    }

    .input-group-text {
      background-color: #f8f9fa;
      border-right: none;
    }

    .form-control:focus {
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    }

    .btn-primary {
      padding: 0.75rem;
      font-weight: 500;
      border-radius: 8px;
    }

    .btn-primary:disabled {
      background-color: #ccc;
      border-color: #ccc;
    }

    .text-danger {
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .register-card {
        margin: 1rem;
      }
    }
  `],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  user = {
    name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
    phoneNumber: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: () => {
        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
        this.router.navigate(['/login']);
      },
      error: (err: Error) => {
        alert('Kayıt sırasında bir hata oluştu: ' + err.message);
      }
    });
  }
} 