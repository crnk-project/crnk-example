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

export module Role {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		movie?: TypedOneResourceRelationship<Movie>;
	}
	export interface Attributes {
		name?: string;
		description?: string;
	}
}
export interface Role extends CrnkStoreResource {
	relationships?: Role.Relationships;
	attributes?: Role.Attributes;
}
export interface RoleResult extends OneQueryResult {
	data?: Role;
}
export interface RoleListResult extends ManyQueryResult {
	data?: Array<Role>;
}
export class QRole extends BeanPath<Role> {
	metaId = 'resources.role';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QRole.QRelationships = new QRole.QRelationships(this, 'relationships');
	attributes: QRole.QAttributes = new QRole.QAttributes(this, 'attributes');
}
export module QRole {
	export class QRelationships extends BeanPath<Role.Relationships> {
		private _movie: QTypedOneResourceRelationship<QMovie, Movie>;
		get movie(): QTypedOneResourceRelationship<QMovie, Movie> {
			if (!this._movie) {
				this._movie =
					new QTypedOneResourceRelationship<QMovie, Movie>(this, 'movie', QMovie);
			}
			return this._movie;
		};
	}
	export class QAttributes extends BeanPath<Role.Attributes> {
		name: StringPath = this.createString('name');
		description: StringPath = this.createString('description');
	}
}
export let createEmptyRole = function(id: string): Role {
	return {
		id: id,
		type: 'role',
		attributes: {
		},
		relationships: {
			movie: {data: null},
		},
	};
};