import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import {Pizza} from '../../models/pizza.model';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

import {LoadPizzas, LoadToppings} from "../../store/actions";
import {getAllPizzas} from "../../store/selectors/pizzas.selector";
import {ProductsState} from "../../store/reducers";
import {tap} from "rxjs/operators";


@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok" 
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<ProductsState>) {}

  ngOnInit() {
    this.pizzas$ = this.store.select(getAllPizzas).pipe(
      tap((pizzas) => console.table(pizzas)),
    );
    this.store.dispatch(new LoadPizzas());
    this.store.dispatch(new LoadToppings());
    }
  }
