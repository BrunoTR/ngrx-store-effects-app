import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";

import {PizzaState, reducer, getPizzasLoaded, getPizzasLoading, getPizzasEntities} from "./pizzas.reducer";

export interface ProductsState {
  pizzas: PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: reducer,
  };

//products state
export const getProductsState = createFeatureSelector<ProductsState>('products');
