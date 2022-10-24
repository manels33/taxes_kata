import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketProductsComponent } from './basket-products.component';

const routes: Routes = [
  { path: '', component: BasketProductsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketProductsRoutingModule { }
