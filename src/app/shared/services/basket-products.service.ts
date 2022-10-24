import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Basket } from './../model/basket.model';
import { Category } from './../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class BasketProductsService {

  constructor() { }

  basketList() : Basket[]{
    return [
      {
        id: '1',
        numberProducts : 3,
        products : [
          {
            id: '1',
            name: "livre",
            Pht: 12.49,
            quantity : 2,
            category: Category.book,
            imported: false
          },
          {
            id: '2',
            name: "CD musical",
            Pht: 14.99,
            quantity : 1,
            category: Category.other,
            imported: false
          },
          {
            id: '3',
            name: "barre de chocolat",
            Pht: 0.85,
            quantity : 3,
            category: Category.foodOrMedication,
            imported: false
          }
        ]
      },
      {
        id: '2',
        numberProducts : 2,
        products : [
          {
            id: '1',
            name: "boîte de chocolat importé",
            Pht: 10.00,
            quantity : 2,
            category: Category.foodOrMedication,
            imported: true
          },
          {
            id: '2',
            name: "flacon de parfum importé",
            Pht: 47.50,
            quantity : 3,
            category: Category.other,
            imported: true
          }
        ]
      },
      {
        id: '3',
        numberProducts : 4,
        products : [
          {
            id: '1',
            name: "flacon de parfum importé",
            Pht: 27.99,
            quantity : 2,
            category: Category.other,
            imported: true
          },
          {
            id: '2',
            name: "flacon de parfum",
            Pht: 18.99,
            quantity : 1,
            category: Category.other,
            imported: false
          },
          {
            id: '3',
            name: "boîte de pilule contre la migraine",
            Pht: 9.75,
            quantity : 3,
            category: Category.foodOrMedication,
            imported: false
          },
          {
            id: '4',
            name: "boîte de chocolat importé",
            Pht: 11.25,
            quantity : 2,
            category: Category.foodOrMedication,
            imported: true
          }
        ]
      }
    ]
  }

  getListProducts(): Observable <Basket[]> {
    return of(this.basketList());
  }
}
