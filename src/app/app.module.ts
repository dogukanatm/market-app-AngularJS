import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Services
import { CartService } from './services/cart.service';
import { AuthGuard } from './guards/auth.guard';

// Components
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailModalComponent } from './components/product-detail-modal/product-detail-modal.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { CafeteriaComponent } from './components/cafeteria/cafeteria.component';

@NgModule({
  declarations: [
    ProductDetailModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    NgbModule,
    FormsModule,
    LoginComponent,
    ProductsComponent,
    CartComponent,
    RegisterComponent,
    CafeteriaComponent,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'cafeteria', component: CafeteriaComponent }
    ])
  ],
  providers: [CartService]
})
export class AppModule { } 