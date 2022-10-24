import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'basket',component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./main/basket-products.module').then(m => m.BasketProductsModule) },
    ]
  },
  {
    path: '**',
    redirectTo: '/basket'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
