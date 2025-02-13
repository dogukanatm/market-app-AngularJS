import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUser: User | null = null;
  private users: User[] = [];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Kayıtlı kullanıcıları yükle
      const savedUsers = localStorage.getItem('users');
      if (savedUsers) {
        this.users = JSON.parse(savedUsers);
      }

      // Mevcut kullanıcıyı kontrol et
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  register(user: Partial<User>): Observable<boolean> {
    return new Observable<boolean>(observer => {
      try {
        if (isPlatformBrowser(this.platformId)) {
          // Kullanıcı adı kontrolü
          if (this.users.find(u => u.username === user.username)) {
            observer.error(new Error('Bu kullanıcı adı zaten kullanılıyor'));
            return;
          }

          // Yeni kullanıcı oluştur
          const newUser: User = {
            id: this.users.length + 1,
            username: user.username!,
            password: user.password!,
            email: user.email!,
            name: user.name,
            surname: user.surname,
            phoneNumber: user.phoneNumber
          };

          // Kullanıcıyı kaydet
          this.users.push(newUser);
          localStorage.setItem('users', JSON.stringify(this.users));
          
          observer.next(true);
          observer.complete();
        }
      } catch (error) {
        observer.error(error);
      }
    });
  }

  login(username: string, password: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Önce kayıtlı kullanıcılar arasında ara
      const user = this.users.find(u => u.username === username && u.password === password);
      
      // Eğer kayıtlı kullanıcı bulunamazsa, varsayılan kullanıcıyı kontrol et
      if (user || (username === 'user' && password === 'password')) {
        this.currentUser = user || { username, password, email: 'default@example.com' };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.isAuthenticatedSubject.next(true);
        return true;
      }
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/login']);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
