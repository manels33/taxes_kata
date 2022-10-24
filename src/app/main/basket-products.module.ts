import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketProductsRoutingModule } from './basket-products-routing.module';
import { BasketProductsComponent } from './basket-products.component';


@NgModule({
  declarations: [
    BasketProductsComponent
  ],
  imports: [
    CommonModule,
    BasketProductsRoutingModule
  ]
})
export class BasketProductsModule { }
