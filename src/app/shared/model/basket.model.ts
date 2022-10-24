import { Product } from "./product.model";

export class Basket {
    constructor(
        public id: string,
        public products: Array<Product>,
        public numberProducts?: number,
    ) {}
}
