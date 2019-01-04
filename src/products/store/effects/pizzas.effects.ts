import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {PizzasService} from "../../services";
import {
  CREATE_PIZZA, CREATE_PIZZA_SUCCESS,
  CreatePizzas, CreatePizzasFail,
  CreatePizzasSuccess,
  LOAD_PIZZAS,
  LoadPizzasFail,
  LoadPizzasSuccess, REMOVE_PIZZA, REMOVE_PIZZA_SUCCESS, RemovePizza, RemovePizzasFail, RemovePizzasSuccess,
  UPDATE_PIZZA, UPDATE_PIZZA_SUCCESS, UpdatePizza, UpdatePizzasFail, UpdatePizzasSuccess,
} from "../actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {Go} from "../../../app/store/actions";


@Injectable()
export class PizzasEffects {

  constructor (
    private actions$ : Actions,
    private  pizzaService: PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        map(pizzas => new LoadPizzasSuccess(pizzas)),
          catchError(error => of (new LoadPizzasFail(error)))
        )
      }));

  @Effect()
  createPizza$ = this.actions$.ofType(CREATE_PIZZA).pipe(
    map((action: CreatePizzas) => action.payload),
      switchMap(pizza => {
        return this.pizzaService.createPizza(pizza).pipe(
          map(pizza => new CreatePizzasSuccess(pizza)),
          catchError(error => of(new CreatePizzasFail(error)))
        )
      })
  );

  @Effect()
  createPizzaSuccess$ = this.actions$.ofType(CREATE_PIZZA_SUCCESS).pipe(
    map((action: CreatePizzasSuccess) => action.payload),
    map(pizza => new Go({path: ['/products', pizza.id], }))
  );


  @Effect()
  updatePizza$ = this.actions$.ofType(UPDATE_PIZZA).pipe(
    map((action:UpdatePizza) => action.payload),
      switchMap((pizza) => {
        return this.pizzaService.updatePizza(pizza).pipe(
          map(pizza => new UpdatePizzasSuccess(pizza)),
          catchError(error => of(new UpdatePizzasFail(error)))
        )
    })
  );

  @Effect()
  removePizza$ = this.actions$.ofType(REMOVE_PIZZA).pipe(
    map((action: RemovePizza) => action.payload),
    switchMap(pizza => {
       return this.pizzaService.removePizza(pizza).pipe(
         map(() => new RemovePizzasSuccess(pizza)),
         catchError(error => of(new RemovePizzasFail(error)))
       )
    })
  );

  @Effect()
  handlePizzaSuccess$ = this.actions$.ofType(UPDATE_PIZZA_SUCCESS,
    REMOVE_PIZZA_SUCCESS).pipe(
      map(pizza => new Go({ path: ['/products'], })));

}
