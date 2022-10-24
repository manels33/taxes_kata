import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Category } from '../shared/model/category.model';
import { BasketProductsService } from '../shared/services/basket-products.service';
import { Product } from '../shared/model/product.model';
import { Basket } from "../shared/model/basket.model";
import { IPrintResult } from '../shared/model/IPrintResult.model';


@Component({
  selector: 'app-basket-products',
  templateUrl: './basket-products.component.html',
  styleUrls: ['./basket-products.component.scss']
})
export class BasketProductsComponent implements OnInit {
  printResult: IPrintResult[] = [];
  totalTaxeAmount : number = 0;
  totalTTCPrice : number = 0;
  contentPrint : any;
  contentProducts: any = "";
  @ViewChild('basket', { static: false })
  basket!: ElementRef;
  
  constructor( private basketProductsService : BasketProductsService, @Inject(DOCUMENT) document:any ) { 
    this.contentPrint = document.getElementById('basket');
  }

  ngOnInit(): void {
    this.getListBasket();
  }

  getListBasket(){
    this.basketProductsService.getListProducts().subscribe((res)=> {
      this.calculateBasket(res);
    })
  }

  private calculateBasket(res: Basket[]) {
    this.printResult = res.map(({products}) => {
      const productsByBasket = this.calculateProducts(products);
      const totalTTCPrice = Number(this.getTotalTTCPrice(productsByBasket).toFixed(2));
      const totalTaxeAmount = Number(this.getTotalTaxeAmount(productsByBasket).toFixed(2));
      return {
        totalTTCPrice,
        totalTaxeAmount,
        products: productsByBasket
      }
    })
  }

  private getTotalTTCPrice(productsByBasket: Product[]) {
    return productsByBasket.reduce((accumulator, { Pttc = 0 }) => {
      return accumulator + Pttc;
    }, 0);
  }

  private getTotalTaxeAmount(productsByBasket: Product[]) {
    return productsByBasket.reduce((accumulator, { taxeAmount = 0 }) => {
      return accumulator + taxeAmount;
    }, 0);
  }

  private calculateProducts(products: Array<Product>) {
    const productsByBasket = products.map((prd) => {
      let additionnalTaxe = this.additionalTaxe(prd.imported);
      let initialTaxe = this.setTaxe(prd.category) + additionnalTaxe;
      const Pttc = this.calculTTCPrice(prd.Pht, prd.quantity, initialTaxe);
      const phtByQuantity = prd.Pht * prd.quantity
      const taxeAmount = this.calculTaxeAmount(phtByQuantity, Pttc);
      return {
        id: prd.id,
        name: prd.name,
        Pht: prd.Pht,
        quantity: prd.quantity,
        category: prd.category,
        imported: prd.imported,
        Pttc,
        taxeAmount,
      }
    })
    return productsByBasket;
  }

  setTaxe(category: Category) : number {
    if(category == Category.foodOrMedication) return 0;
    if(category == Category.book) return 10;
    return 20;
  }
  additionalTaxe(imported: boolean) : number {
    if(imported) return 5;
    return 0;
  }
  round5Cent(price: number) : number {
    return Math.round(price/0.05)*0.05;
  }
  calculTTCPrice(PhtPrice:number, quantity:number, initialTaxe: number) : number {
     let TTCPriceProduct = this.round5Cent(PhtPrice*quantity + (PhtPrice*quantity*initialTaxe/100));
    return Number((TTCPriceProduct).toFixed(2));
  }
  calculTaxeAmount(PhtPriceProducts: number, TTCPriceProducts:number) : number {
    return TTCPriceProducts - PhtPriceProducts;
  }
  printBasket(basketId:any){
    let popupWin = null;
    this.printResult[basketId].products.forEach(product => {
      this.contentProducts += `<tr>
          <td>
            ${product.quantity} ${product.name}<br>
          </td>
          <td>${product.Pttc} €</td>
      </tr>
      `
      return this.contentProducts;
    });

    this.contentPrint = `
    <font size="4" face="Calibri" >
    <table class="basket-details" width="100% cellpadding="0" cellspacing="0" align="left">
        <thead align="left">
          <th>Panier</th>
          <th>Prix TTC</th>
        </thead>
        <tbody>
            ${this.contentProducts}
       </tbody>
        <tfooter>
          <tr>
            <td>Montant TTC Total : ${this.printResult[basketId].totalTTCPrice} € </td>
            <td>Montant Total des taxes : ${this.printResult[basketId].totalTaxeAmount} €</td>
          </tr>
        </tfooter>
    </table>
    </font>`;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto')!
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print Basket</title>
        </head>
        <body onload="window.print();window.close()">${this.contentPrint}</body>
      </html>`
    );
    this.contentProducts = "";
    popupWin.document.close();
  }
}
