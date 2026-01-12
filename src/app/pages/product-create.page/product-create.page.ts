import {Component, inject} from '@angular/core';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {Button} from 'primeng/button';
import {FileUpload} from 'primeng/fileupload';
import {FloatLabel} from 'primeng/floatlabel';
import {InputNumber} from 'primeng/inputnumber';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'app-product-create.page',
  imports: [
    Button,
    FileUpload,
    FloatLabel,
    ImageCropperComponent,
    InputNumber,
    InputText,
    ReactiveFormsModule,
    Textarea
  ],
  templateUrl: './product-create.page.html',
  styleUrl: './product-create.page.scss',
})
export class ProductCreatePage {

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _productService: ProductService = inject(ProductService);
  private readonly _router: Router = inject(Router);

  form = this._fb.group({
    name: ['', [Validators.required]],
    description: ['', []],
    price: ['', [Validators.required]],
  });

  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageBlob: Blob | null = null;

  fileChangeEvent(event: any) {

    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      const fakeEvent = {
        target: {
          files: dataTransfer.files
        }
      };

      this.imageChangedEvent = fakeEvent;
    } else if (event.target && event.target.files) {
      this.imageChangedEvent = event;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    if(event.base64) {
      this.dateUriToBlop(event.base64).then(blop => {
        this.imageBlob = blop;
      });
    }
  }

  async dateUriToBlop(dateUri: string) {
    const response = await fetch(dateUri);
    return await response.blob();
  }

  submit() {

    this.form.markAllAsTouched();

    if(this.form.invalid || !this.imageBlob) {
      return;
    }

    this._productService.post(this.form.value as any, this.imageBlob).subscribe({
      next: () => {
        this._router.navigate(['/']);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
