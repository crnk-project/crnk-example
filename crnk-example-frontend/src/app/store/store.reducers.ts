import * as _ from 'lodash';
import {Action} from '@ngrx/store';
import {ViewModel, ViewRouteModel, ViewState} from '../../model/';
import {initAppState, PresentationState} from './store.model';
import {
	AddNotificationPayload,
	AddViewRoutesAction,
	CloseViewAction,
	DialogOpenAction,
	DialogOpenPayload,
	DialogPatchDataAction,
	DialogPatchDataPayload,
	NotificationAddAction,
	NotificationRemoveAction,
	PresentationActions,
	SetActionStateAction,
	SetupViewFailAction,
	SetupViewFailPayload,
	SetupViewInitAction,
	SetupViewPayload,
	SetupViewSuccessAction,
	SetupViewSuccessPayload,
	SetViewStateAction,
	UpdateViewAction
} from './store.actions';
import {NotificationsModel} from '../../model/arb.presentation.model.view';


export function presentationReducer(
	state: PresentationState = initAppState,
	actionObj: Action
) {
	switch (actionObj.type) {
		case PresentationActions.ADD_VIEW_ROUTES: {
			const action = actionObj as AddViewRoutesAction;
			return addViewRoutes(state, action.payload.routes);
		}
		case PresentationActions.UPDATE_VIEW: {
			const action = actionObj as UpdateViewAction;
			return updateView(state, action.payload.view);
		}
		case PresentationActions.SETUP_VIEW_INIT: {
			const action = actionObj as SetupViewInitAction;
			return setupViewInit(state, action.payload);
		}
		case PresentationActions.SETUP_VIEW_SUCCESS: {
			const action = actionObj as SetupViewSuccessAction;
			return setupViewSuccess(state, action.payload);
		}
		case PresentationActions.SETUP_VIEW_FAIL: {
			const action = actionObj as SetupViewFailAction;
			return setupViewFail(state, action.payload);
		}
		case PresentationActions.DESTROY_VIEW_INIT: {
			// currently this both removing all loaded data and removing/closing the view (CLOSE_VIEW)
			// at some point in the future we may want to keep a few things in memory
			if (state.openViewId) {
				return closeView(state, state.openViewId);
			}
			return state;
		}
		case PresentationActions.CLOSE_VIEW: {
			const action = actionObj as CloseViewAction;
			return closeView(state, action.payload.viewId);
		}
		case PresentationActions.DIALOG_OPEN: {
			const action = actionObj as DialogOpenAction;
			return dialogOpen(state, action.payload);
		}
		case PresentationActions.DIALOG_PATCH_DATA: {
			const action = actionObj as DialogPatchDataAction;
			return dialogPatchData(state, action.payload);
		}
		case PresentationActions.DIALOG_CLOSE: {
			return dialogClose(state);
		}
		case PresentationActions.NOTIFICATION_ADD: {
			const action = actionObj as NotificationAddAction;
			return notificationAdd(notificationRemove(state, action.payload.id), action.payload);
		}
		case PresentationActions.NOTIFICATION_REMOVE: {
			const action = actionObj as NotificationRemoveAction;
			return notificationRemove(state, action.id);
		}
		case PresentationActions.SET_VIEW_STATE: {
			const action = actionObj as SetViewStateAction;
			return setViewState(state, action.payload.data);
		}
		case PresentationActions.SET_ACTION_STATE: {
			const action = actionObj as SetActionStateAction;
			return setActionState(state, action.payload.actionId, action.payload.data);
		}
		default:
			return state;
	}
};

export function setActionState(state: PresentationState, actionId: string, data: any) {
	const newView = _.merge({}, state.views[state.openViewId], {
		actions: {
			map: {
				[actionId]: data
			}
		}
	});
	return updateOpenView(state, newView);
}

export function setViewState(state: PresentationState, data: any) {
	const newView = _.merge({}, state.views[state.openViewId], data);
	return updateOpenView(state, newView);
}

export function notificationAdd(state: PresentationState, payload: AddNotificationPayload) {
	const newNotifications = _.clone(state.views[state.openViewId].notifications);
	newNotifications.map = {
		...newNotifications.map,
		[payload.id]: payload.element
	};
	newNotifications.order = [...newNotifications.order, payload.id];
	return updatenNotifications(state, newNotifications);
}

export function notificationRemove(state: PresentationState, id: string) {
	const newNotifications = _.clone(state.views[state.openViewId].notifications);
	newNotifications.order = _.pull(_.clone(newNotifications.order), id);
	newNotifications.map = _.omit(newNotifications.map, id) as any;
	return updatenNotifications(state, newNotifications);
}

function updatenNotifications(state: PresentationState, notificationsModel: NotificationsModel) {
	const newView = _.clone(state.views[state.openViewId]);
	newView.notifications = notificationsModel;
	return updateOpenView(state, newView);
}

function updateOpenView(state: PresentationState, newView: ViewModel) {
	const newState = _.clone(state);
	const newViews = _.clone(newState.views);

	newState.views = newViews;
	newViews[state.openViewId] = newView;
	return newState;
}

export function dialogOpen(state: PresentationState, payload: DialogOpenPayload) {
	const newState = _.clone(state);
	newState.openDialog = {
		dialog: payload.model,
		data: {}
	};
	return newState;
}

export function dialogPatchData(state: PresentationState, payload: DialogPatchDataPayload) {
	function customizer(objValue, srcValue) {
		if (_.isArray(objValue)) {
			return srcValue;
		}
	};

	const newState = _.clone(state);
	newState.openDialog = _.clone(newState.openDialog);
	newState.openDialog.data = _.mergeWith({}, state.openDialog.data, payload.data, customizer);

	if (_.isEqual(newState.openDialog.data, state.openDialog.data)) {
		return state;
	}
	return newState;
}

export function dialogClose(state: PresentationState) {
	const newState = _.clone(state);
	delete newState.openDialog;
	return newState;
}

export function addViewRoutes(state: PresentationState, routes: Array<ViewRouteModel>) {
	const newState = _.clone(state);
	newState.routes = _.clone(state.routes);
	for (const route of routes) {
		newState.routes[route.id] = _.cloneDeep(route);
	}
	return newState;
}

export function closeView(state: PresentationState, viewId: string) {
	const newState = _.clone(state);
	newState.views = _.clone(state.views);
	delete newState.views[viewId];
	if (newState.openViewId === viewId) {
		newState.openViewId = null;
	}
	return newState;
}

export function updateView(state: PresentationState, view: ViewModel) {
	const newState = _.clone(state);
	newState.views = _.clone(state.views);
	newState.views[view.id] = view;
	return newState;
}

export function setupViewInit(
	state: PresentationState,
	payload: SetupViewPayload
): PresentationState {
	let view: ViewModel = state.views[payload.viewId];

	if (!view) {
		// setup empty view, to be initialized by effects
		const opening: ViewState = 'OPENING';
		view = {
			id: payload.viewId,
			state: opening,
			zoneId: null,
			componentDefinitionId: null,
			notifications: {
				map: {},
				order: []
			}
		};
	}

	const newState = updateView(state, view);
	newState.openViewId = view.id;
	delete newState.openDialog;
	return newState;
}


export function setupViewSuccess(
	state: PresentationState,
	payload: SetupViewSuccessPayload
): PresentationState {
	const view = state.views[payload.viewId];
	if (view) {
		const newView = Object.assign({}, view, {
			state: 'OPEN'
		});
		return updateView(state, newView);
	}
	return state;
}


export function setupViewFail(
	state: PresentationState,
	payload: SetupViewFailPayload
): PresentationState {
	const view = state.views[payload.viewId];
	if (view) {
		const newView = Object.assign({}, view, {
			state: 'ERROR'
		});
		return updateView(state, newView);
	}
	return state;
}

