import { Pizza } from "../../models/pizza.model";
import {
  CREATE_PIZZA_SUCCESS,
  LOAD_PIZZAS,
  LOAD_PIZZAS_FAIL,
  LOAD_PIZZAS_SUCCESS,
  PizzasAction, UPDATE_PIZZA_SUCCESS
} from "../actions/pizzas.action";

export interface PizzaState {
  entities: { [id: number] : Pizza };
  loaded: boolean;
  loading: boolean
}

export const initialState : PizzaState = {
  entities: { },
  loaded: false,
  loading: false,
}

export function reducer (
  state = initialState,
  action: PizzasAction
) : PizzaState {

    switch(action.type) {

      case LOAD_PIZZAS: {
        return {
          ...state,
          loading: true
        }
      };

      case LOAD_PIZZAS_SUCCESS: {
        const pizzas = action.payload;

        const entities = pizzas.reduce((entities: {[id: number]: Pizza} , pizza: Pizza) => {
          return {
            ...entities, [pizza.id]: pizza
          };
          },
          {
            ...state.entities,
          }
        );

        return {
          ...state,
          loading: false,
          loaded: true,
          entities,
        }
      };

      case LOAD_PIZZAS_FAIL: {
        return {
          ...state,
          loading: false,
          loaded: false
        }
      };

      case UPDATE_PIZZA_SUCCESS:
      case CREATE_PIZZA_SUCCESS: {
        const pizza = action.payload;
        const entities = {
          ...state.entities, [pizza.id]: pizza
        };
        return{
          ...state, entities,
        }
      }

    }

  return state;
}

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;


