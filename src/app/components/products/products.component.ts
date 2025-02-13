
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-4">
      <div class="layout">
        <!-- Kategoriler -->
        <div class="categories-section">
          <div class="categories-sticky">
            <h2 class="categories-title">Kategoriler</h2>
            <div class="categories-list">
              <button class="category-item"
                      [class.active]="!selectedCategory"
                      (click)="selectCategory('')">
                <i class="bi bi-grid-fill"></i>
                <span>Tüm Ürünler</span>
                <span class="count">{{products.length}}</span>
              </button>
              <button *ngFor="let cat of categories"
                      class="category-item"
                      [class.active]="selectedCategory === cat"
                      (click)="selectCategory(cat)">
                <i class="bi" [class]="getCategoryIcon(cat)"></i>
                <span>{{cat}}</span>
                <span class="count">{{getCategoryCount(cat)}}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Ürünler -->
        <div class="products-section">
          <div class="products-grid">
            <div *ngFor="let product of filteredProducts" class="product-card">
              <div class="image-container">
                <img [src]="product.imageUrl" [alt]="product.name">
              </div>
              <div class="product-info">
                <h3 class="product-name">{{product.name}}</h3>
                <p class="product-desc">{{product.description}}</p>
                <div class="product-footer">
                  <span class="price">{{product.price}} ₺</span>
                  <button class="add-to-cart"
                          (click)="addToCart(product)"
                          [disabled]="product.stock <= 0">
                    <i class="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 2rem;
    }

    .categories-section {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      overflow: hidden;
    }

    .categories-sticky {
      position: sticky;
      top: 1rem;
    }

    .categories-title {
      font-size: 1.25rem;
      font-weight: 600;
      padding: 1.25rem;
      margin: 0;
      border-bottom: 1px solid #e9ecef;
      color: #2d3436;
    }

    .categories-list {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .category-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border: none;
      background: transparent;
      border-radius: 8px;
      color: #636e72;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
      text-align: left;
    }

    .category-item:hover {
      background: #f8f9fa;
      color: #0984e3;
    }

    .category-item.active {
      background: #0984e3;
      color: white;
    }

    .category-item i {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .category-item span {
      flex: 1;
    }

    .count {
      background: rgba(0,0,0,0.1);
      padding: 0.25rem 0.5rem;
      border-radius: 20px;
      font-size: 0.8rem;
      min-width: 28px;
      text-align: center;
    }

    .category-item.active .count {
      background: rgba(255,255,255,0.2);
    }

    @media (max-width: 992px) {
      .layout {
        grid-template-columns: 1fr;
      }

      .categories-section {
        order: -1;
        margin-bottom: 1rem;
      }

      .categories-sticky {
        position: static;
      }

      .categories-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 0.5rem;
      }
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
      padding: 0.5rem;
    }

    .product-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.12);
    }

    .image-container {
      position: relative;
      padding-top: 75%;
      background: #f8f9fa;
    }

    .image-container img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 1rem;
    }

    .product-info {
      padding: 1rem;
    }

    .product-name {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
      color: #2d3436;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .product-desc {
      font-size: 0.875rem;
      color: #636e72;
      margin: 0 0 1rem 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .price {
      font-size: 1.125rem;
      font-weight: 700;
      color: #0984e3;
    }

    .add-to-cart {
      background: #0984e3;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .add-to-cart:hover {
      background: #0878d3;
    }

    .add-to-cart:disabled {
      background: #b2bec3;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 1rem;
      }

      .product-info {
        padding: 0.75rem;
      }

      .product-name {
        font-size: 0.9rem;
      }

      .product-desc {
        font-size: 0.8rem;
        margin-bottom: 0.75rem;
      }

      .price {
        font-size: 1rem;
      }

      .add-to-cart {
        padding: 0.4rem 0.8rem;
      }
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  
  get filteredProducts(): Product[] {
    return this.selectedCategory 
      ? this.products.filter(p => p.category === this.selectedCategory)
      : this.products;
  }

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
    
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category === this.selectedCategory ? '' : category;
  }

  addToCart(product: Product): void {
    if (product.stock > 0) {
      this.cartService.addToCart(product);
    }
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'Temel Gıda': 'bi-basket',
      'Süt Ürünleri': 'bi-cup-hot',
      'Meyve Sebze': 'bi-flower1',
      'Atıştırmalık': 'bi-cookie',
      'İçecekler': 'bi-cup-straw',
      'Temizlik': 'bi-droplet',
      'Kahvaltılık': 'bi-egg-fried'
    };
    return icons[category] || 'bi-tag';
  }

  getCategoryCount(category: string): number {
    return this.products.filter(p => p.category === category).length;
  }
}
