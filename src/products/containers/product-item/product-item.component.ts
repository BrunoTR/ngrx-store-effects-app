import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';

import { Pizza } from '../../models/pizza.model';

import { Topping } from '../../models/topping.model';
import {Store} from "@ngrx/store";
import {ProductsState} from "../../store/reducers";
import {getAllToppings, getPizzaVisualised, getSelectedPizza} from "../../store/selectors";
import {Observable} from "rxjs";
import {LoadToppings, VisualiseToppings} from "../../store/actions";
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
export class ProductItemComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
    console.log('Componente Item Destruido');
  }



  onSelect(event: number[]) {
    this.store.dispatch(new VisualiseToppings(event));
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
