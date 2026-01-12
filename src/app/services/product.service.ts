import {inject, Injectable} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProductFormDtoModels} from '../models/product-form-dto.models';
import {ProductModel} from '../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly _http: HttpClient = inject(HttpClient);

  private readonly _apiUrl: string = environment.API_URL + "/product";

  get() {
    return httpResource<ProductModel[]>(() => `${this._apiUrl}`);
  }

  post(form: ProductFormDtoModels, image: Blob){

    const formData = new FormData();

    formData.append('form', JSON.stringify(form));

    formData.append('image', image, "blob.webp");

    return this._http.post<void>(this._apiUrl, formData);
  }
}
