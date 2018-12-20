import {Topping} from "../../models/topping.model";
import {
  LOAD_TOPPINGS, LOAD_TOPPINGS_FAIL,
  LOAD_TOPPINGS_SUCCESS,
  ToppingsAction
} from "../actions";


export interface ToppingsState {
  entities: { [id: number] : Topping };
  loaded: boolean;
  loading: boolean
}

export const initialState : ToppingsState = {
  entities: { },
  loaded: false,
  loading: false,
}

export function reducerT (
  state = initialState,
  action: ToppingsAction
) : ToppingsState {

  switch(action.type) {

    case LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      }
    };

    case LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;

      const entities = toppings.reduce((entities: {[id: number]: Topping} , topping: Topping) => {
          return {
            ...entities, [topping.id]: topping
          };
      },
        {
          ...state.entities,
        }
    );

      console.log( state.entities );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      }
    };

    case LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    };
  }

  return state;
}

export const getToppingsEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
