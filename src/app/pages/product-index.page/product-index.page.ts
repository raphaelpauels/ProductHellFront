import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {TableModule} from 'primeng/table';
import {CurrencyPipe} from '@angular/common';
import {environment} from '../../../environments/environment';
import {CartStore} from '../../stores/cart.store';
import {ProductModel} from '../../models/Product.model';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-product-index.page',
  imports: [
    ReactiveFormsModule,
    TableModule,
    CurrencyPipe,
    Button
  ],
  templateUrl: './product-index.page.html',
  styleUrl: './product-index.page.scss',
})
export class ProductIndexPage {

  private readonly _cartStore = inject(CartStore);
  private readonly _productService: ProductService = inject(ProductService);
  protected readonly environment = environment;

  products = this._productService.get();

  add(product: ProductModel) {
    this._cartStore.addLine(product);
  }
}
