import {ProductModel} from './Product.model';

export interface CartLineModel {
  product: ProductModel;
  amount: number;
}
