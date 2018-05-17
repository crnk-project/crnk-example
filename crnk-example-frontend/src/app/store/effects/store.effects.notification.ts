import {delay, filter, map, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import '../../rxjs-operators';
import {NgrxJsonApiActionTypes} from 'ngrx-json-api';
import {Store} from '@ngrx/store';
import {AppState} from '../store.model';
import {AppActionTypes, SetNotificationAction} from '../store.actions';
import {getAppState} from '../store.module';


@Injectable()
export class AppNotificationEffects {


	@Effect() notifyUserUponEditorSaveSuccess;

	@Effect() hideSaveSuccessAfterTimeout;

	constructor(actions: Actions, store: Store<any>) {

		// show as notification in store and directly as material snackbar
		this.notifyUserUponEditorSaveSuccess = actions
			.ofType(NgrxJsonApiActionTypes.API_APPLY_SUCCESS).pipe(
			withLatestFrom(store, (action, state) => getAppState(state)),
			filter((state: AppState) => state.current != null),
			map((state: AppState) => state.current.created ? 'editor.create.success' : 'editor.save.success'),
			map(messageKey => new SetNotificationAction('editor', messageKey)));

		const clearNotification = () => new SetNotificationAction('editor', null);

		this.hideSaveSuccessAfterTimeout = actions
			.ofType(AppActionTypes.NOTIFICATION_SET).pipe(
			filter((action: SetNotificationAction) => action.id.startsWith('editor')),
			delay(5000),
			filter((action: SetNotificationAction) => action.messageKey != null),
			map(clearNotification));
	}
}
