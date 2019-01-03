import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import { Pizza } from '../../models/pizza.model';

import { Topping } from '../../models/topping.model';
import {Store} from "@ngrx/store";
import {ProductsState} from "../../store/reducers";
import {getAllToppings, getPizzaVisualised, getSelectedPizza} from "../../store/selectors";
import {Observable} from "rxjs";
import {CreatePizzas, LoadToppings, UpdatePizza, VisualiseToppings} from "../../store/actions";
import {tap} from "rxjs/operators";

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
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store<ProductsState>) {}

  ngOnInit() {
    this.pizza$ = this.store.select(getSelectedPizza).pipe(
      tap((pizza : Pizza = null) => {
        const pizzaExists = !!(pizza && pizza.toppings);
        const toppings = pizzaExists? pizza.toppings.map(topping => topping.id) : [ ];
        this.store.dispatch(new VisualiseToppings(toppings));
      })
    );
    this.toppings$ = this.store.select(getAllToppings);
    this.visualise$ = this.store.select(getPizzaVisualised)
  }

  onSelect(event: number[]) {
    this.store.dispatch(new VisualiseToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new CreatePizzas(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {

    }
  }
}
