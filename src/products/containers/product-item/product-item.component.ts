import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Pizza } from '../../models/pizza.model';

import { Topping } from '../../models/topping.model';
import {Store} from "@ngrx/store";
import {ProductsState} from "../../store/reducers";
import {getAllToppings, getSelectedPizza} from "../../store/selectors";
import {Observable} from "rxjs";
import {LoadToppings} from "../../store/actions";

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  template: `
    <div 
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise: Pizza;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store<ProductsState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadToppings());
    this.pizza$ = this.store.select(getSelectedPizza);
    this.toppings$ = this.store.select(getAllToppings)
  }

  onSelect(event: number[]) {

  }

  onCreate(event: Pizza) {

  }

  onUpdate(event: Pizza) {

  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {

    }
  }
}
