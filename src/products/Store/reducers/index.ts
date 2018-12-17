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

//pizza state
export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

//
export const getAllPizzasEntities = createSelector(getPizzaState, getPizzasEntities);
export const getAllPizzas = createSelector(getAllPizzasEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id,10)]);
});

export const getLoadedPizzas = createSelector(getPizzaState, getPizzasLoaded);
export const getLoadingPizzas = createSelector(getPizzaState, getPizzasLoading);

