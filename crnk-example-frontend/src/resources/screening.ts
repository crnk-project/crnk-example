import {
	Location,
	QLocation
} from './location';
import {
	Movie,
	QMovie
} from './movie';
import {
	BeanPath,
	CrnkStoreResource,
	QTypedOneResourceRelationship,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult,
	ResourceRelationship,
	TypedOneResourceRelationship
} from 'ngrx-json-api';

export module Screening {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		movie?: TypedOneResourceRelationship<Movie>;
		location?: TypedOneResourceRelationship<Location>;
	}
}
export interface Screening extends CrnkStoreResource {
	relationships?: Screening.Relationships;
}
export interface ScreeningResult extends OneQueryResult {
	data?: Screening;
}
export interface ScreeningListResult extends ManyQueryResult {
	data?: Array<Screening>;
}
export class QScreening extends BeanPath<Screening> {
	metaId = 'resources.screening';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QScreening.QRelationships = new QScreening.QRelationships(this, 'relationships');
}
export module QScreening {
	export class QRelationships extends BeanPath<Screening.Relationships> {
		private _movie: QTypedOneResourceRelationship<QMovie, Movie>;
		get movie(): QTypedOneResourceRelationship<QMovie, Movie> {
			if (!this._movie) {
				this._movie =
					new QTypedOneResourceRelationship<QMovie, Movie>(this, 'movie', QMovie);
			}
			return this._movie;
		}
		private _location: QTypedOneResourceRelationship<QLocation, Location>;
		get location(): QTypedOneResourceRelationship<QLocation, Location> {
			if (!this._location) {
				this._location =
					new QTypedOneResourceRelationship<QLocation, Location>(this, 'location', QLocation);
			}
			return this._location;
		}
	}
}
export let createEmptyScreening = function(id: string): Screening {
	return {
		id: id,
		type: 'screening',
		relationships: {
			movie: {data: null},
			location: {data: null},
		},
	};
};