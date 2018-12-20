import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {ToppingsService} from "../../services";
import {LOAD_TOPPINGS, LoadToppingsFail, LoadToppingsSuccess} from "../actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs/observable/of";


@Injectable()
export class ToppingsEffects {

  constructor (
    private actions$ : Actions,
    private  toppingService: ToppingsService
  ) {}

  @Effect()
  loadToppings$ = this.actions$.ofType(LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingService.getToppings().
        pipe(
         map(toppings => new LoadToppingsSuccess(toppings)),
          catchError(error => of (new LoadToppingsFail(error)))
       )
    }));
}
