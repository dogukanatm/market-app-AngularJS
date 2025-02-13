import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          this.items = JSON.parse(savedCart);
          this.cartSubject.next(this.items);
        } catch (e) {
          console.error('Cart parsing error:', e);
          this.items = [];
          this.cartSubject.next(this.items);
        }
      }
    }
  }

  getItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product): void {
    if (product.stock <= 0) return;

    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity++;
        this.updateCart();
      }
    } else {
      this.items.push({ product, quantity: 1 });
      this.updateCart();
    }
  }

  updateQuantity(product: Product, quantity: number): void {
    const item = this.items.find(item => item.product.id === product.id);
    if (item && quantity >= 1 && quantity <= product.stock) {
      item.quantity = quantity;
      this.updateCart();
    }
  }

  removeFromCart(product: Product): void {
    const index = this.items.findIndex(item => item.product.id === product.id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.updateCart();
    }
  }

  clearCart(): void {
    this.items = [];
    this.updateCart();
  }

  private updateCart(): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem('cart', JSON.stringify(this.items));
      } catch (e) {
        console.error('Cart saving error:', e);
      }
    }
    this.cartSubject.next(this.items);
  }
}