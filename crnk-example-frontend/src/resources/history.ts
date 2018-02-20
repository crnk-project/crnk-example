import {
	BeanPath,
	CrnkStoreResource,
	QTypedManyResourceRelationship,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult,
	ResourceRelationship,
	TypedManyResourceRelationship
} from 'ngrx-json-api';

export module History {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		history?: TypedManyResourceRelationship<History>;
	}
	export interface Attributes {
		newValue?: string;
		oldValue?: string;
	}
}
export interface History extends CrnkStoreResource {
	relationships?: History.Relationships;
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
	relationships: QHistory.QRelationships = new QHistory.QRelationships(this, 'relationships');
	attributes: QHistory.QAttributes = new QHistory.QAttributes(this, 'attributes');
}
export module QHistory {
	export class QRelationships extends BeanPath<History.Relationships> {
		private _history: QTypedManyResourceRelationship<QHistory, History>;
		get history(): QTypedManyResourceRelationship<QHistory, History> {
			if (!this._history) {
				this._history =
					new QTypedManyResourceRelationship<QHistory, History>(this, 'history', QHistory);
			}
			return this._history;
		};
	}
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
		relationships: {
			history: {data: []},
		},
	};
};