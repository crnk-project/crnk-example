import {
	BeanPath,
	CrnkStoreResource,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult
} from 'ngrx-json-api';

export module History {
	export interface Attributes {
		newValue?: string;
		oldValue?: string;
	}
}
export interface History extends CrnkStoreResource {
	attributes?: History.Attributes;
}
export interface HistoryResult extends OneQueryResult {
	data?: History;
}
export interface HistoryListResult extends ManyQueryResult {
	data?: Array<History>;
}
export class QHistory extends BeanPath<History> {
	metaId = 'resources.history';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	attributes: QHistory.QAttributes = new QHistory.QAttributes(this, 'attributes');
}
export module QHistory {
	export class QAttributes extends BeanPath<History.Attributes> {
		newValue: StringPath = this.createString('newValue');
		oldValue: StringPath = this.createString('oldValue');
	}
}
export let createEmptyHistory = function(id: string): History {
	return {
		id: id,
		type: 'history',
		attributes: {
		},
	};
};