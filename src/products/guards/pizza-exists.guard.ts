import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, map, switchMap, take, tap} from 'rxjs/operators';
import {Pizza} from '../models/pizza.model';
import {LoadPizzas} from '../store/actions';
import {ProductsState} from '../store/reducers';
import {getAllPizzasEntities, getLoadedPizzas} from '../store/selectors';
import {Injectable} from '@angular/core';


@Injectable()
export class PizzasExistsGuard implements CanActivate {
	constructor (private store: Store<ProductsState>) { }

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		return this.checkStore().pipe(
			switchMap(() => {
				const id = parseInt(route.params.pizzaId, 10);
				return this.hasPizza(id);
			}),
		);
	}

	hasPizza(id: number): Observable<boolean> {
		return this.store.select(getAllPizzasEntities).pipe(
			map((entities: {[key: number]: Pizza}) => !!entities[id]),
			take(1)
		);
	}

	checkStore(): Observable<boolean> {
		return this.store.select(getLoadedPizzas).pipe(
			tap(loaded => {
				if (!loaded) {
					this.store.dispatch(new LoadPizzas());
				}
			}),
			filter(loaded => loaded),
			take(1)
		);
	}

}
