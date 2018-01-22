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
import '../../rxjs-operators';
import { NgrxJsonApiActionTypes } from 'ngrx-json-api';
import { Store } from '@ngrx/store';
import { AppState } from '../store.model';
import { AppActionTypes, SetNotificationAction } from '../store.actions';
import { getAppState } from '../store.module';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class AppNotificationEffects {


	@Effect() notifyUserUponEditorSaveSuccess;

	@Effect() hideSaveSuccessAfterTimeout;

	constructor(actions: Actions, store: Store<any>) {

		// show as notification in store and directly as material snackbar
		this.notifyUserUponEditorSaveSuccess = actions
			.ofType(NgrxJsonApiActionTypes.API_APPLY_SUCCESS)
			.withLatestFrom(store, (action, state) => getAppState(state))
			.filter((state: AppState) => state.current != null)
			.map((state: AppState) => state.current.created ? 'editor.create.success' : 'editor.save.success')
			.map(messageKey => new SetNotificationAction('editor', messageKey));

		const clearNotification = () => new SetNotificationAction('editor', null);

		this.hideSaveSuccessAfterTimeout = actions
			.ofType(AppActionTypes.NOTIFICATION_SET)
			.filter((action: SetNotificationAction) => action.id.startsWith('editor'))
			.delay(5000)
			.filter((action: SetNotificationAction) => action.messageKey != null)
			.map(clearNotification);
	}
}
