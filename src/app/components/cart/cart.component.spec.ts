import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartItem } from '../../services/cart.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 100,
    description: 'Test Description',
    imageUrl: 'test.jpg',
    category: 'Test Category',
    stock: 10
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, RouterModule.forRoot([])],
      declarations: [CartComponent],
      providers: [
        CartService,
        OrderService,
        AuthService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update quantity', () => {
    cartService.addToCart(mockProduct);
    const cartItem: CartItem = { product: mockProduct, quantity: 1 };
    component.updateQuantity(cartItem, 3);
    
    cartService.getItems().subscribe(items => {
      expect(items[0].quantity).toBe(3);
    });
  });

  it('should remove item from cart', () => {
    cartService.addToCart(mockProduct);
    const cartItem: CartItem = { product: mockProduct, quantity: 1 };
    component.removeFromCart(cartItem);
    
    cartService.getItems().subscribe(items => {
      expect(items.length).toBe(0);
    });
  });

  it('should calculate totals correctly', (done) => {
    cartService.addToCart(mockProduct);
    const cartItem: CartItem = { product: mockProduct, quantity: 1 };
    component.updateQuantity(cartItem, 3);
    
    cartService.getItems().subscribe(items => {
      component.cartItems = items;
      fixture.detectChanges();
      
      expect(component.subtotal).toBe(300);
      expect(component.shipping).toBe(0);
      expect(component.total).toBe(300);
      done();
    });
  });
});
