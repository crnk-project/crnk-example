import * as _ from 'lodash';
import { Action } from '@ngrx/store';
import { AppState, initAppState } from './store.model';
import { AppActionTypes, OpenResourceAction, SetLanguageAction, SetNotificationAction } from './store.actions';


export function appReducer(
	state: AppState = initAppState,
	actionObj: Action
) {
	switch (actionObj.type) {
		case AppActionTypes.NOTIFICATION_SET: {
			const action = actionObj as SetNotificationAction;
			return notificationSet(state, action);
		}
		case AppActionTypes.SET_CURRENT_RESOURCE: {
			const action = actionObj as OpenResourceAction;
			if (action.resourceType) {
				return {
					...state,
					current: {
						resourceType: action.resourceType,
						resourceId: action.resourceId,
						created: action.create
					}
				};
			}
			else {
				return {
					...state,
					current: null
				};
			}
		}
		case AppActionTypes.SET_LANGUAGE: {
			const action = actionObj as SetLanguageAction;
			if (action.language) {
				return {
					...state,
					language: action.language
				};
			}
			else {
				return {
					...state
				};
			}
		}
		default:
			return state;
	}
}

export function notificationSet(state: AppState, action: SetNotificationAction) {
	const newNotifications = _.clone(state.notifications);
	if (action.messageKey) {
		newNotifications[action.id] = action.messageKey;
	}
	else {
		delete newNotifications[action.id];
	}
	return {
		...state,
		notifications: newNotifications
	};
}