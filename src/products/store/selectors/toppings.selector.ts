import {createSelector} from "@ngrx/store";
import {getProductsState, ProductsState} from "../reducers";
import {
  getSelectedToppings,
  getToppingsEntities,
  getToppingsLoaded,
  getToppingsLoading
} from "../reducers/toppings.reducer";


export const getToppingsState = createSelector(getProductsState,  (state: ProductsState) => state.toppings);

export const getToppingEntitieS = createSelector(  getToppingsState,  getToppingsEntities);

export const  getAllToppings = createSelector(
  getToppingEntitieS,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id,10)]);
  }
);

export const getSelectedTopping = createSelector(getToppingsState,getSelectedToppings)

export const getAllToppingsLoaded = createSelector(getToppingsState, getToppingsLoaded);

export const getAllToppingsLoading = createSelector(getToppingsState, getToppingsLoading);
