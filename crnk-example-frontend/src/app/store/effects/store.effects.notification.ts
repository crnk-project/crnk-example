import { Injectable } from '@angular/core';
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
import '../../../common/rxjs-operators';
import { NgrxJsonApiActionTypes } from 'ngrx-json-api';
import { Store } from '@ngrx/store';
import { AppState } from '../store.model';
import { AppActionTypes, SetNotificationAction } from '../store.actions';


@Injectable()
export class AppNotificationEffects {


	@Effect() notifyUserUponEditorSaveSuccess;

	@Effect() hideSaveSuccessAfterTimeout;

	constructor(actions: Actions, store: Store<any>) {

		this.notifyUserUponEditorSaveSuccess = actions
			.ofType(NgrxJsonApiActionTypes.API_APPLY_SUCCESS)
			.withLatestFrom(store, (action, state) => state as AppState)
			.filter((state: AppState) => state.current != null)
			.map((state: AppState) => {
				return new SetNotificationAction('editor',
					state.current.created ? 'editor.create.success' : 'editor.save.success');
			});


		this.hideSaveSuccessAfterTimeout = actions
			.ofType(AppActionTypes.NOTIFICATION_SET)
			.delay(5000)
			.filter((action: SetNotificationAction) => action.id.startsWith('editor'))
			.map(() => new SetNotificationAction('editor', null));
	}
}
