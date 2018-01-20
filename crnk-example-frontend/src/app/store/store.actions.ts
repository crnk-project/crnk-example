import { Action } from '@ngrx/store';

export enum AppActionTypes {
	NOTIFICATION_SET = '[Demo] NOTIFICATION_SET',
	OPEN_RESOURCE = '[Demo] OPEN_RESOURCE',
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


export type AppActions = SetNotificationAction | OpenResourceAction ;