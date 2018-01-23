import {
	QRole,
	Role
} from './role';
import {
	BeanPath,
	CrnkStoreResource,
	NumberPath,
	QTypedManyResourceRelationship,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult,
	ResourceRelationship,
	TypedManyResourceRelationship
} from 'ngrx-json-api';

export module Movie {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		roles?: TypedManyResourceRelationship<Role>;
	}
	export interface Attributes {
		name?: string;
		year?: number;
		version?: number;
	}
}
export interface Movie extends CrnkStoreResource {
	relationships?: Movie.Relationships;
	attributes?: Movie.Attributes;
}
export interface MovieResult extends OneQueryResult {
	data?: Movie;
}
export interface MovieListResult extends ManyQueryResult {
	data?: Array<Movie>;
}
export class QMovie extends BeanPath<Movie> {
	metaId = 'resources.movie';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QMovie.QRelationships = new QMovie.QRelationships(this, 'relationships');
	attributes: QMovie.QAttributes = new QMovie.QAttributes(this, 'attributes');
}
export module QMovie {
	export class QRelationships extends BeanPath<Movie.Relationships> {
		private _roles: QTypedManyResourceRelationship<QRole, Role>;
		get roles(): QTypedManyResourceRelationship<QRole, Role> {
			if (!this._roles) {
				this._roles =
					new QTypedManyResourceRelationship<QRole, Role>(this, 'roles', QRole);
			}
			return this._roles;
		};
	}
	export class QAttributes extends BeanPath<Movie.Attributes> {
		name: StringPath = this.createString('name');
		year: NumberPath = this.createNumber('year');
		version: NumberPath = this.createNumber('version');
	}
}
export let createEmptyMovie = function(id: string): Movie {
	return {
		id: id,
		type: 'movie',
		attributes: {
		},
		relationships: {
			roles: {data: []},
		},
	};
};