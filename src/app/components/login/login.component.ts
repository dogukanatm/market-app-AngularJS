import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>Giriş Yap</h2>
      <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
        <div class="form-group">
          <label for="username">Kullanıcı Adı</label>
          <input 
            type="text" 
            id="username"
            name="username"
            [(ngModel)]="username"
            required>
        </div>
        <div class="form-group">
          <label for="password">Şifre</label>
          <input 
            type="password" 
            id="password"
            name="password"
            [(ngModel)]="password"
            required>
        </div>
        <button type="submit" [disabled]="!loginForm.form.valid">
          Giriş Yap
        </button>

        <p class="register-link">
          Hesabınız yok mu? 
          <a routerLink="/register">Kayıt Ol</a>
        </p>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
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
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
    }
    .register-link {
      text-align: center;
      margin-top: 1rem;
      color: #666;
    }
    .register-link a {
      color: #007bff;
      text-decoration: none;
    }
    .register-link a:hover {
      text-decoration: underline;
    }
  `],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/']);
    } else {
      alert('Geçersiz kullanıcı adı veya şifre!');
    }
  }
}
