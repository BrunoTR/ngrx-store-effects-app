import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {PizzasService} from "../../services";
import {
  CREATE_PIZZA,
  CreatePizzas, CreatePizzasFail,
  CreatePizzasSuccess,
  LOAD_PIZZAS,
  LoadPizzasFail,
  LoadPizzasSuccess,
  UPDATE_PIZZA, UpdatePizza, UpdatePizzasFail, UpdatePizzasSuccess,
} from "../actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs/observable/of";


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
  updatePizza$ = this.actions$.ofType(UPDATE_PIZZA).pipe(
    map((action:UpdatePizza) => action.payload),
      switchMap((pizza) => {
        return this.pizzaService.updatePizza(pizza).pipe(
          map(pizza => new UpdatePizzasSuccess(pizza)),
          catchError(error => of(new UpdatePizzasFail(error)))
        )
    })
  );

}
