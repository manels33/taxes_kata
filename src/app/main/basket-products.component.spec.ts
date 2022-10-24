import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Category } from '../shared/model/category.model';

import { BasketProductsComponent } from './basket-products.component';

describe('BasketProductsComponent', () => {
  let component: BasketProductsComponent;
  let fixture: ComponentFixture<BasketProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component logic', () => {
    it('should call getListBasket() on Init', () => {
      let called = false;
      (component as any).getListBasket = () => { called = true; }
      component.ngOnInit();

      expect(called).toBeTruthy();
    });
  });

  describe('set taxe pourcentage', ()=>{
    it('should set taxe 0 when category is foodMedication', ()=> {
      expect(component.setTaxe(Category.foodOrMedication)).toBe(0);
    });
    it('should set taxe 10% when category is book', ()=> {
      expect(component.setTaxe(Category.book)).toBe(10);
    });
    it('should set taxe 20% for other categories', ()=> {
      expect(component.setTaxe(Category.other)).toBe(20);
    });
    it('should add taxe 5% if imported products is true', ()=> {
      expect(component.additionalTaxe(true)).toBe(5);
    });
  });

  describe('calcul TTCPrice', ()=>{
    it('should return 27.5 for 2 books at 12.49€', ()=> {
      expect(component.calculTTCPrice(12.49, 2, 10)).toBe(27.5);
    });
    it('should return 18€ for 1 CD musical = 14.99€', ()=> {
      expect(component.calculTTCPrice(14.99, 1, 20)).toBe(18);
    });
    it('should return 2.55€ for 3 chocolate at 0.85€', ()=> {
      expect(component.calculTTCPrice(0.85, 3, 0)).toBe(2.55);
    });
  });

  describe('calculate taxe amount', ()=>{
    it('should return 3.01€ for 1 CD musical', ()=> {
      expect(component.calculTaxeAmount(14.99, 18)).toBe(3.01);
    });
  });

  // describe('calculate total prices', ()=>{
  // });
});
