//pizza state
import {getPizzasEntities, getPizzasLoaded, getPizzasLoading} from "../reducers/pizzas.reducer";
import {getProductsState, ProductsState} from "../reducers";
import {createSelector} from "@ngrx/store";
import {Pizza} from "../../models/pizza.model";
import {getRouterState} from "../../../app/store/reducers";
import {getSelectedTopping, getToppingEntitieS} from "./toppings.selector";

export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

export const getAllPizzasEntities = createSelector(getPizzaState, getPizzasEntities);

export const getSelectedPizza = createSelector(
  getAllPizzasEntities,
  getRouterState,
  (entities, router): Pizza => {
      console.log(router.state);
      console.log(router.state.params);
      console.log(router.state && entities[router.state.params.pizzaId]);
      return router.state && entities[router.state.params.pizzaId];
  }
);

export const getPizzaVisualised = createSelector(
  getSelectedPizza,
  getToppingEntitieS,
  getSelectedTopping,
  (pizza, toppingEntities, selectedToppings) => {
        console.log(selectedToppings);
        const toppings = selectedToppings.map(id => toppingEntities[id]);
        console.log(toppings);
        return {...pizza, toppings};
  }
);

export const getAllPizzas = createSelector(getAllPizzasEntities, entities => {
    console.log(entities);
    return Object.keys(entities).map(id => entities[parseInt(id,10)]);
});

export const getLoadedPizzas = createSelector(getPizzaState, getPizzasLoaded);
export const getLoadingPizzas = createSelector(getPizzaState, getPizzasLoading);
