import {map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Actions, Effect} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export class Go implements Action {
	readonly type = GO;

	constructor(public payload: {
		path: any[];
		query?: object;
		extras?: NavigationExtras;
	}) {}
}

export class Back implements Action {
	readonly type = BACK;
}

export class Forward implements Action {
	readonly type = FORWARD;
}

export type RouterActions
	= Go
	| Back
	| Forward;

@Injectable()
export class RouterEffects {

	@Effect({dispatch: false})
	navigate$: Observable<any> = this.actions$.ofType(GO).pipe(
		map((action: Go) => action.payload),
		tap(({path, query: queryParams, extras}) => this.router.navigate(path, {queryParams, ...extras})),);

	@Effect({dispatch: false})
	navigateBack$ = this.actions$.ofType(BACK).pipe(
		tap(() => this.location.back()));

	@Effect({dispatch: false})
	navigateForward$ = this.actions$.ofType(FORWARD).pipe(
		tap(() => this.location.forward()));

	constructor(
		private actions$: Actions,
		private router: Router,
		private location: Location
	) {}
}
