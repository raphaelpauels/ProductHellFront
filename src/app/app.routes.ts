import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: "", loadComponent: () => import("./pages/product-index.page/product-index.page").then(m => m.ProductIndexPage)},
  {path: "create", loadComponent: () => import("./pages/product-create.page/product-create.page").then(m => m.ProductCreatePage)},
];
