import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-body">
          <div class="text-center mb-4">
            <i class="bi bi-person-circle display-1"></i>
            <h2 class="mt-2">{{user?.username}}</h2>
            <p class="text-muted">{{user?.email}}</p>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <h5><i class="bi bi-person"></i> Kullanıcı Bilgileri</h5>
                <p><strong>Kullanıcı Adı:</strong> {{user?.username}}</p>
                <p><strong>E-posta:</strong> {{user?.email}}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <h5><i class="bi bi-clock-history"></i> Hesap Bilgileri</h5>
                <p><strong>Son Giriş:</strong> {{lastLogin | date:'medium'}}</p>
                <p><strong>Üyelik Tarihi:</strong> {{joinDate | date:'mediumDate'}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: none;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-radius: 12px;
    }
    .bi-person-circle {
      color: #2563eb;
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: any;
  lastLogin: Date = new Date();
  joinDate: Date = new Date(2024, 0, 1);

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }
} 