import { LanguageCode } from '../common/language/common.language';

export interface Notifications {
	[id: string]: string;
}

export interface OpenResource {
	resourceType: string;
	resourceId?: string;
	created?: boolean;
}

export interface AppState {
	notifications: Notifications;
	current?: OpenResource;
	language: LanguageCode;
}

export const initAppState: AppState = {
	notifications: {},
	current: null,
	language: null
};





