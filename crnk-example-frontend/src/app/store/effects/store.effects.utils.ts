import {
	ApiDeleteSuccessAction,
	ApiPatchFailAction,
	ApiPatchSuccessAction,
	ApiPostFailAction,
	ApiPostSuccessAction,
	Document,
	NgrxJsonApiActionTypes,
	Resource
} from 'ngrx-json-api';
import '../../rxjs-operators';


export function matchesResource(document: Document, resourceType: string, resourceId?: string) {
	const resource = document.data as Resource;
	return resource != null && resource.type === resourceType && (!resourceId || resourceId === resource.id);
}

export function apiPatchSuccessFilter(resourceType: string, resourceId?: string) {
	return (action) => action.type === NgrxJsonApiActionTypes.API_PATCH_SUCCESS &&
		matchesResource((action as ApiPostSuccessAction).payload.jsonApiData, resourceType, resourceId);
}


export function apiDeleteSuccessFilter(resourceType: string, resourceId?: string) {
	return (action) => action.type === NgrxJsonApiActionTypes.API_DELETE_SUCCESS &&
		matchesResource((action as ApiDeleteSuccessAction).payload.jsonApiData, resourceType, resourceId);
}

export function apiPatchFailFilter(resourceType: string, resourceId?: string) {
	return (action) => action.type === NgrxJsonApiActionTypes.API_PATCH_FAIL &&
		matchesResource((action as ApiPostFailAction).payload.jsonApiData, resourceType, resourceId);
}

export function apiPostSuccessFilter(resourceType: string) {
	return (action) => action.type === NgrxJsonApiActionTypes.API_POST_SUCCESS &&
		matchesResource((action as ApiPatchSuccessAction).payload.jsonApiData, resourceType);
}

export function apiPostFailFilter(resourceType: string) {
	return (action) => action.type === NgrxJsonApiActionTypes.API_POST_FAIL &&
		matchesResource((action as ApiPatchFailAction).payload.jsonApiData, resourceType);
}
