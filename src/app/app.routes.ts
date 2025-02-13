import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { CafeteriaComponent } from './components/cafeteria/cafeteria.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'cafeteria', component: CafeteriaComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'orders/:id', component: OrderTrackingComponent, canActivate: [AuthGuard] },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component')
      .then(m => m.RegisterComponent)
  },
  { path: '**', redirectTo: '' }  // Bilinmeyen rotaları ana sayfaya yönlendir
];
