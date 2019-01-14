import {PizzasGuard} from './pizzas.guard';
import {PizzasExistsGuard} from './pizza-exists.guard';
import {ToppingsGuard} from './toppings.guard';

export const guards: any[] = [PizzasGuard, PizzasExistsGuard, ToppingsGuard];



