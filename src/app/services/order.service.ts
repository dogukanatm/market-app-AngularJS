import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from './cart.service';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  address: string;
  paymentMethod: string;
  orderDate: Date;
  estimatedDelivery: Date;
  courierName?: string;
  courierPhone?: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private ordersSubject = new BehaviorSubject<Order[]>([]);

  constructor() {
    // LocalStorage'dan siparişleri yükle kısımı
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
      this.ordersSubject.next(this.orders);
    }
  }

  createOrder(orderData: {
    items: CartItem[];
    total: number;
    status: string;
    userId: string;
    address: string;
    paymentMethod: string;
  }): Order {
    const order: Order = {
      id: 'ORD-' + Date.now(),
      items: orderData.items,
      total: orderData.total,
      status: orderData.status as Order['status'],
      address: orderData.address,
      paymentMethod: orderData.paymentMethod,
      orderDate: new Date(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      userId: orderData.userId
    };

    this.orders.unshift(order);
    this.saveOrders();
    return order;
  }

  getOrders(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }

  getUserOrders(userId: string): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find(order => order.id === id);
  }

  updateOrderStatus(orderId: string, status: Order['status']): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      if (status === 'shipped') {
        order.courierName = 'Ahmet Yılmaz';
        order.courierPhone = '0555 123 4567';
      }
      this.saveOrders();
    }
  }

  private saveOrders(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders));
    this.ordersSubject.next(this.orders);
  }
} 