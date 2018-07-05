import {
	BeanPath,
	CrnkStoreResource,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult
} from 'ngrx-json-api';

export interface Location extends CrnkStoreResource {
}
export interface LocationResult extends OneQueryResult {
	data?: Location;
}
export interface LocationListResult extends ManyQueryResult {
	data?: Array<Location>;
}
export class QLocation extends BeanPath<Location> {
	metaId = 'resources.location';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
}
export let createEmptyLocation = function(id: string): Location {
	return {
		id: id,
		type: 'location',
	};
};