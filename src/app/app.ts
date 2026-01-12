import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Button} from 'primeng/button';
import {OverlayBadge} from 'primeng/overlaybadge';
import {CartStore} from './stores/cart.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, OverlayBadge],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('TI_Net_2026_Product_Hell.Fend');

  private readonly _cartStore = inject(CartStore);

  get cartCount() {
    return this._cartStore.count;
  }
}
