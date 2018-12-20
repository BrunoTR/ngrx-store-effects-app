import {ActionReducerMap, createFeatureSelector} from "@ngrx/store";

import {PizzaState, reducer} from "./pizzas.reducer";
import {reducerT, ToppingsState} from "./toppings.reducer";

export interface ProductsState {
  pizzas: PizzaState,
  toppings: ToppingsState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: reducer,
  toppings: reducerT
  };

//products state
export const getProductsState = createFeatureSelector<ProductsState>('products');
