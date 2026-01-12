import {CartLineModel} from '../models/cart-line.model';
import {getState, patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, effect} from '@angular/core';
import {ProductModel} from '../models/Product.model';

type CartState = {
  lines: CartLineModel[],
}

const initialState: CartState = {
  lines: [],
};

export const CartStore = signalStore(
  withState(initialState),
  withComputed(
    ({lines}) => ({
      count: computed(() => lines().reduce((total, line) => total + line.amount, 0)),
      totalPrice: computed(() => lines().reduce((total,line) => total + (line.product.price * line.amount),0)),
    }),
  ),
  withMethods(
    store => ({
      loadSession() {
        const cart = JSON.parse(localStorage.getItem("cart") || '{ "lines": [] }');
        patchState(store, state => ({...state, lines: cart.lines}));
      },
      addLine(product: ProductModel) {
        patchState(store, state => {

          const lines = [...state.lines];

          const existingLine = lines.find((line) => line.product.id === product.id);

          if(existingLine) {
            existingLine.amount += 1;
          } else {
            lines.push({product, amount: 1});
          }

          console.warn(lines);

          return {...state, lines}
        })
      },
      clear() {
        patchState(store, state => ({...state, lines: []}));
      }
    }),
  ),
  withHooks({
    onInit(store){
      store.loadSession();
      effect(() => {
        const state = getState(store);
        localStorage.setItem("cart", JSON.stringify(state));
      });
    }
  }),
);
