import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {LoadPizzas} from '../store/actions';
import {getPizzasLoaded, PizzaState} from '../store/reducers/pizzas.reducer';


@Injectable()
export class PizzasGuard implements CanActivate {

	constructor(private store: Store<PizzaState>) {
	}

	canActivate(): Observable<boolean> {
		return this.checkStore().pipe(
			switchMap(() => of(true)),
			catchError(() => of(false))
		)
	}

	checkStore(): Observable<boolean> {
		return this.store.select(getPizzasLoaded).pipe(
			tap(loaded => {
				if (!loaded) {
					this.store.dispatch(new LoadPizzas());
				}
			}),
			filter(loaded => loaded),
			take(1)
		)
	}

}
