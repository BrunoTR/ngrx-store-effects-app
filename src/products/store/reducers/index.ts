import {ActionReducerMap, createFeatureSelector} from "@ngrx/store";

import {PizzaState, reducer} from "./pizzas.reducer";

export interface ProductsState {
  pizzas: PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: reducer,
  };

//products state
export const getProductsState = createFeatureSelector<ProductsState>('products');
