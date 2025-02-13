import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { PLATFORM_ID } from '@angular/core';
import { Product } from '../models/product.model';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', (done) => {
    const mockProduct: Product = {
      id: 1,
      name: 'Test Product',
      price: 100,
      description: 'Test Description',
      imageUrl: 'test.jpg',
      category: 'Test Category',
      stock: 10
    };

    service.addToCart(mockProduct);
    service.getItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].product).toEqual(mockProduct);
      expect(items[0].quantity).toBe(1);
      done();
    });
  });

  it('should update quantity', (done) => {
    const mockProduct: Product = {
      id: 1,
      name: 'Test Product',
      price: 100,
      description: 'Test Description',
      imageUrl: 'test.jpg',
      category: 'Test Category',
      stock: 10
    };

    service.addToCart(mockProduct);
    service.updateQuantity(mockProduct, 3);

    service.getItems().subscribe(items => {
      expect(items[0].quantity).toBe(3);
      done();
    });
  });

  it('should remove item from cart', (done) => {
    const mockProduct: Product = {
      id: 1,
      name: 'Test Product',
      price: 100,
      description: 'Test Description',
      imageUrl: 'test.jpg',
      category: 'Test Category',
      stock: 10
    };

    service.addToCart(mockProduct);
    service.removeFromCart(mockProduct);

    service.getItems().subscribe(items => {
      expect(items.length).toBe(0);
      done();
    });
  });

  it('should clear cart', (done) => {
    const mockProduct: Product = {
      id: 1,
      name: 'Test Product',
      price: 100,
      description: 'Test Description',
      imageUrl: 'test.jpg',
      category: 'Test Category',
      stock: 10
    };

    service.addToCart(mockProduct);
    service.clearCart();

    service.getItems().subscribe(items => {
      expect(items.length).toBe(0);
      done();
    });
  });
}); 