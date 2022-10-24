import { Category } from "./category.model";

export class Product {
    constructor(
        public id: string,
        public name: string,
        public Pht: number,
        public quantity: number,
        public category: Category,
        public imported: boolean,
        public taxeAmount?: number,
        public Pttc?: number,
    ){}
}
