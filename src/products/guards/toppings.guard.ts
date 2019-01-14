import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {LoadToppings} from '../store/actions';
import {ProductsState} from '../store/reducers';
import {getAllToppingsLoaded} from '../store/selectors';


@Injectable()
export class ToppingsGuard implements CanActivate {

	constructor(private store: Store<ProductsState>) { }

	canActivate(): Observable<boolean> {
		return this.checkStore().pipe(
			switchMap(() => of(true)),
			catchError(() => of(false))
		);
	}

	checkStore(): Observable<boolean> {
		return this.store.select(getAllToppingsLoaded).pipe(
			tap(loaded => {
				if (!loaded) {
					this.store.dispatch(new LoadToppings());
				}
			}),
			filter(loaded => loaded),
			take(1)
		);
	}

}
