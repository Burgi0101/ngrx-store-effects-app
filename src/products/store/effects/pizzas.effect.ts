import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as pizzActions from '../actions/pizzas.action';
import * as fromServices from '../../services';


@Injectable()
export class PizzasEffects {

    constructor(
        private actions$: Actions,
        private pizzaService: fromServices.PizzasService
    ) { }

    @Effect()
    loadPizzas$ = this.actions$.ofType(pizzActions.LOAD_PIZZAS).pipe(
        switchMap(() => {
            return this.pizzaService
                .getPizzas()
                .pipe(
                    map(pizzas => new pizzActions.LoadPizzasSuccess(pizzas)),
                    catchError(error => of(new pizzActions.LoadPizzasFail(error)))
                )
        })
    )
}