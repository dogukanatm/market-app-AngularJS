import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: any;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        LoginComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.login with correct credentials', () => {
    component.username = 'user';
    component.password = 'password';
    authService.login.and.returnValue(true);
    spyOn(router, 'navigate');

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('user', 'password');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show alert on login failure', () => {
    component.username = 'wrong';
    component.password = 'wrong';
    authService.login.and.returnValue(false);
    spyOn(window, 'alert');

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('wrong', 'wrong');
    expect(window.alert).toHaveBeenCalledWith('Geçersiz kullanıcı adı veya şifre!');
  });
});
