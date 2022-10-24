import { Product } from "./product.model";

export interface IPrintResult {
    totalTTCPrice?: number,
    totalTaxeAmount?: number
    products: Product[];
}
  