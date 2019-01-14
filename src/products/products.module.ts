import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {guards} from './guards';
import {PizzasExistsGuard} from './guards/pizza-exists.guard';
import {PizzasGuard} from './guards/pizzas.guard';
import {ToppingsGuard} from './guards/toppings.guard';
import {reducers, effects} from "./store";

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

//guards

// services
import * as fromServices from './services';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [PizzasGuard],
    component: fromContainers.ProductsComponent,
  },
  {
    path: 'new',
    canActivate: [PizzasGuard, ToppingsGuard],
    component: fromContainers.ProductItemComponent,
  },
  {
    path: ':pizzaId',
    canActivate: [PizzasExistsGuard, ToppingsGuard],
    component: fromContainers.ProductItemComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [...fromServices.services, ...guards],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components],
})
export class ProductsModule {}
