import { Action } from '@ngrx/store';
import { LanguageCode } from '../common/language/common.language';

export enum AppActionTypes {
	NOTIFICATION_SET = '[Demo] NOTIFICATION_SET',
	OPEN_RESOURCE = '[Demo] OPEN_RESOURCE',
	SET_CURRENT_RESOURCE = '[Demo] SET_CURRENT_RESOURCE',
	SET_LANGUAGE = '[Demo] SET_LANGUAGE',
}

/**
 * Sets the given notification on the screen
 */
export class SetNotificationAction implements Action {
	readonly type = AppActionTypes.NOTIFICATION_SET;

	constructor(public id: string, public messageKey: string) {
	}
}

/**
 * Opens the explorer or editor of the given type.
 */
export class OpenResourceAction implements Action {
	readonly type = AppActionTypes.OPEN_RESOURCE;

	constructor(public resourceType: string, public resourceId?: string, public create?: boolean) {
	}
}


/**
 * Set currently open resource
 */
export class SetCurrentResourceAction implements Action {
	readonly type = AppActionTypes.SET_CURRENT_RESOURCE;

	constructor(public resourceType: string, public resourceId?: string, public create?: boolean) {
	}
}

/**
 * Set language
 */
export class SetLanguageAction implements Action {
	readonly type = AppActionTypes.SET_LANGUAGE;

	constructor(public language: LanguageCode) {
	}
}


export type AppActions = SetNotificationAction | OpenResourceAction | SetCurrentResourceAction | SetLanguageAction ;