import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <h2>Kayıt Ol</h2>
      <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
        <div class="form-group">
          <label for="username">Kullanıcı Adı</label>
          <input 
            type="text" 
            id="username"
            name="username"
            [(ngModel)]="user.username"
            required>
        </div>

        <div class="form-group">
          <label for="email">E-posta</label>
          <input 
            type="email" 
            id="email"
            name="email"
            [(ngModel)]="user.email"
            required>
        </div>

        <div class="form-group">
          <label for="password">Şifre</label>
          <input 
            type="password" 
            id="password"
            name="password"
            [(ngModel)]="user.password"
            required>
        </div>

        <div class="form-group">
          <label for="name">Ad (İsteğe bağlı)</label>
          <input 
            type="text" 
            id="name"
            name="name"
            [(ngModel)]="user.name">
        </div>

        <div class="form-group">
          <label for="surname">Soyad (İsteğe bağlı)</label>
          <input 
            type="text" 
            id="surname"
            name="surname"
            [(ngModel)]="user.surname">
        </div>

        <div class="form-group">
          <label for="phone">Telefon (İsteğe bağlı)</label>
          <input 
            type="tel" 
            id="phone"
            name="phone"
            [(ngModel)]="user.phoneNumber">
        </div>

        <button type="submit" [disabled]="!registerForm.form.valid">
          Kayıt Ol
        </button>

        <p class="login-link">
          Zaten hesabınız var mı? 
          <a routerLink="/login">Giriş Yap</a>
        </p>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      margin-top: 1rem;
    }
    button:disabled {
      background-color: #ccc;
    }
    .login-link {
      text-align: center;
      margin-top: 1rem;
      color: #666;
    }
    .login-link a {
      color: #007bff;
      text-decoration: none;
    }
    .login-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    name: '',
    surname: '',
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
      error: (error) => {
        alert(error.message || 'Kayıt sırasında bir hata oluştu!');
      }
    });
  }
} 