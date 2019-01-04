import {Injectable} from "@angular/core";
import {BACK, FORWARD, Go, GO} from "../actions";
import {map, tap} from "rxjs/operators";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {Actions, Effect} from "@ngrx/effects";

@Injectable()
export class RouterEffects {

  constructor(
    private actions$: Actions,

  private router: Router
,
  private location: Location
) {
}

@Effect({dispatch: false})
navigate$ = this.actions$.ofType(GO).pipe(
  map((action: Go) => action.payload),
  tap(({path, query: queryParams, extras}) => {
    this.router.navigate(path, {queryParams, ...extras});
  })
);

@Effect({dispatch: false})
navigateBack$ = this.actions$.ofType(BACK).pipe(
  tap(() => this.location.back()));

@Effect({dispatch: false})
navigateForward$ = this.actions$.ofType(FORWARD).pipe(
  tap(() => this.location.forward()));

}
