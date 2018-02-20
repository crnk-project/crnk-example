import {
	History,
	QHistory
} from './history';
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

export module ScheduleDto {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		history?: TypedManyResourceRelationship<History>;
	}
	export interface Attributes {
		name?: string;
		upperName?: string;
	}
}
export interface ScheduleDto extends CrnkStoreResource {
	relationships?: ScheduleDto.Relationships;
	attributes?: ScheduleDto.Attributes;
}
export interface ScheduleDtoResult extends OneQueryResult {
	data?: ScheduleDto;
}
export interface ScheduleDtoListResult extends ManyQueryResult {
	data?: Array<ScheduleDto>;
}
export class QScheduleDto extends BeanPath<ScheduleDto> {
	metaId = 'resources.scheduleDto';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QScheduleDto.QRelationships = new QScheduleDto.QRelationships(this, 'relationships');
	attributes: QScheduleDto.QAttributes = new QScheduleDto.QAttributes(this, 'attributes');
}
export module QScheduleDto {
	export class QRelationships extends BeanPath<ScheduleDto.Relationships> {
		private _history: QTypedManyResourceRelationship<QHistory, History>;
		get history(): QTypedManyResourceRelationship<QHistory, History> {
			if (!this._history) {
				this._history =
					new QTypedManyResourceRelationship<QHistory, History>(this, 'history', QHistory);
			}
			return this._history;
		};
	}
	export class QAttributes extends BeanPath<ScheduleDto.Attributes> {
		name: StringPath = this.createString('name');
		upperName: StringPath = this.createString('upperName');
	}
}
export let createEmptyScheduleDto = function(id: string): ScheduleDto {
	return {
		id: id,
		type: 'scheduleDto',
		attributes: {
		},
		relationships: {
			history: {data: []},
		},
	};
};