import {filter, map, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import '../../rxjs-operators';
import {Go} from '../../common/router/common.router.navigation';
import {AppActionTypes, OpenResourceAction} from '../store.actions';
import {ApiApplySuccessAction, ApiPostSuccessAction, NgrxJsonApiActionTypes} from 'ngrx-json-api';
import {apiPostSuccessFilter} from './store.effects.utils';
import {getAppState} from '../store.module';


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
			.ofType(AppActionTypes.OPEN_RESOURCE).pipe(
			map((action: OpenResourceAction) => {
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
			}));

		this.openExplorerOnceEditorResourceSuccessfullyDeleted$ = actions$
			.ofType(NgrxJsonApiActionTypes.API_DELETE_SUCCESS).pipe(
			withLatestFrom(store, (action, state) => getAppState(state)),
			filter(state => state.current != null && state.current.resourceId != null),
			map(state => new OpenResourceAction(state.current.resourceType)),);


		this.openEditorByIdOnceResourceSuccessfullyPosted$ = actions$
			.ofType(NgrxJsonApiActionTypes.API_APPLY_SUCCESS).pipe(
			withLatestFrom(store, (action: ApiApplySuccessAction, state) => {
				const appState = getAppState(state);
				if (appState.current) {
					return action.payload.find(apiPostSuccessFilter(appState.current.resourceType));
				}
				return null;
			}),
			filter(action => action != null),
			map((action: ApiPostSuccessAction) => action.payload.jsonApiData.data),
			map(resource => new OpenResourceAction(resource.type, resource.id)),);
	}
}
