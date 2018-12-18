import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {PizzasService} from "../../services";
import {LOAD_PIZZAS, LoadPizzasFail, LoadPizzasSuccess} from "../actions";
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
}
