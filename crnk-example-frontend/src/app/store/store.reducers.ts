import * as _ from 'lodash';
import { Action } from '@ngrx/store';
import { ViewModel, ViewRouteModel, ViewState } from '../../model/';
import { AppState, initAppState } from './store.model';
import { AppActionTypes, OpenResourceAction, SetNotificationAction } from './store.actions';


export function appReducer(
	state: AppState = initAppState,
	actionObj: Action
) {
	switch (actionObj.type) {
		case AppActionTypes.NOTIFICATION_SET: {
			const action = actionObj as SetNotificationAction;
			return notificationSet(state, action);
		}
		case AppActionTypes.OPEN_RESOURCE: {
			const action = actionObj as OpenResourceAction;
			return {
				...state,
				current: {
					resourceType: action.resourceType,
					resourceId: action.resourceId,
					create: action.create
				}
			}
		}
		default:
			return state;
	}
};

export function notificationSet(state: AppState, action: SetNotificationAction) {
	const newNotifications = _.clone(state.notifications);
	if (action.messageKey) {
		newNotifications[action.messageKey] = action.messageKey;
	}
	else {
		delete newNotifications[action.messageKey];
	}
	return {
		...state,
		notifications: newNotifications
	}
}