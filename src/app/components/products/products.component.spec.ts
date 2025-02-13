import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { CartService } from '../../services/cart.service';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      providers: [ CartService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with product list', () => {
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should add product to cart', () => {
    const testProduct = component.products[0];
    spyOn(window, 'alert');
    spyOn(cartService, 'addToCart');

    component.addToCart(testProduct);

    expect(cartService.addToCart).toHaveBeenCalledWith(testProduct);
    expect(window.alert).toHaveBeenCalledWith('Ürün sepete eklendi!');
  });

  it('should have correct product structure', () => {
    component.products.forEach(product => {
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeDefined(); 
      expect(product.description).toBeDefined();
    });
  });
});
