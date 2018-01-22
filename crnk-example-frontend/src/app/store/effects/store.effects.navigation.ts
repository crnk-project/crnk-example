import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';

import '../../rxjs-operators';
import { Go } from '../../common/router/common.router.navigation';
import { AppActionTypes, OpenResourceAction } from '../store.actions';
import { ApiApplySuccessAction, ApiPatchSuccessAction, ApiPostSuccessAction, NgrxJsonApiActionTypes } from 'ngrx-json-api';
import { AppState } from '../store.model';
import { apiPatchSuccessFilter, apiPostSuccessFilter } from './store.effects.utils';
import { getAppState } from '../store.module';


@Injectable()
export class AppNavigationEffects {

	@Effect() navigateToResource;

	@Effect() openExplorerOnceEditorResourceSuccessfullyDeleted$;

	@Effect() openEditorByIdOnceResourceSuccessfullyPosted$;

	constructor(
		actions$: Actions,
		store: Store<any>
	) {
		this.navigateToResource = actions$
			.ofType(AppActionTypes.OPEN_RESOURCE)
			.map((action: OpenResourceAction) => {
				if (action.create && action.resourceId) {
					return new Go({ path: [`/${action.resourceType}/create`, { id: action.resourceId }] });
				}
				else if (action.create) {
					return new Go({ path: [`/${action.resourceType}/create`] });
				}
				else if (action.resourceId) {
					return new Go({ path: [`/${action.resourceType}/${action.resourceId}`] });
				}
				else {
					return new Go({ path: [`/${action.resourceType}`] });
				}
			});

		this.openExplorerOnceEditorResourceSuccessfullyDeleted$ = actions$
			.ofType(NgrxJsonApiActionTypes.API_DELETE_SUCCESS)
			.withLatestFrom(store, (action, state) => getAppState(state))
			.filter(state => state.current != null && state.current.resourceId != null)
			.map(state => new OpenResourceAction(state.current.resourceType));


		this.openEditorByIdOnceResourceSuccessfullyPosted$ = actions$
			.ofType(NgrxJsonApiActionTypes.API_APPLY_SUCCESS)
			.withLatestFrom(store, (action: ApiApplySuccessAction, state) => {
				const appState = getAppState(state);
				console.log(appState);
				if (appState.current) {
					return action.payload.find(apiPostSuccessFilter(appState.current.resourceType));
				}
				return null;
			})
			.do(it => console.log("SWT", it))
			.filter(action => action != null)
			.map((action: ApiPostSuccessAction) => action.payload.jsonApiData.data)
			.map(resource => new OpenResourceAction(resource.type, resource.id));
	}
}
