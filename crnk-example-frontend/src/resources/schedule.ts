import {
	History,
	QHistory
} from './history';
import {
	Movie,
	QMovie
} from './movie';
import {
	BeanPath,
	CrnkStoreResource,
	QTypedManyResourceRelationship,
	QTypedOneResourceRelationship,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult,
	ResourceRelationship,
	TypedManyResourceRelationship,
	TypedOneResourceRelationship
} from 'ngrx-json-api';

export module Schedule {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		movie?: TypedOneResourceRelationship<Movie>;
		history?: TypedManyResourceRelationship<History>;
	}
	export interface Attributes {
		name?: string;
	}
}
export interface Schedule extends CrnkStoreResource {
	relationships?: Schedule.Relationships;
	attributes?: Schedule.Attributes;
}
export interface ScheduleResult extends OneQueryResult {
	data?: Schedule;
}
export interface ScheduleListResult extends ManyQueryResult {
	data?: Array<Schedule>;
}
export class QSchedule extends BeanPath<Schedule> {
	metaId = 'resources.schedule';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QSchedule.QRelationships = new QSchedule.QRelationships(this, 'relationships');
	attributes: QSchedule.QAttributes = new QSchedule.QAttributes(this, 'attributes');
}
export module QSchedule {
	export class QRelationships extends BeanPath<Schedule.Relationships> {
		private _movie: QTypedOneResourceRelationship<QMovie, Movie>;
		get movie(): QTypedOneResourceRelationship<QMovie, Movie> {
			if (!this._movie) {
				this._movie =
					new QTypedOneResourceRelationship<QMovie, Movie>(this, 'movie', QMovie);
			}
			return this._movie;
		};
		private _history: QTypedManyResourceRelationship<QHistory, History>;
		get history(): QTypedManyResourceRelationship<QHistory, History> {
			if (!this._history) {
				this._history =
					new QTypedManyResourceRelationship<QHistory, History>(this, 'history', QHistory);
			}
			return this._history;
		};
	}
	export class QAttributes extends BeanPath<Schedule.Attributes> {
		name: StringPath = this.createString('name');
	}
}
export let createEmptySchedule = function(id: string): Schedule {
	return {
		id: id,
		type: 'schedule',
		attributes: {
		},
		relationships: {
			movie: {data: null},
			history: {data: []},
		},
	};
};