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

export module Person {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		roles?: TypedManyResourceRelationship<Role>;
	}
	export interface Attributes {
		name?: string;
		year?: number;
	}
}
export interface Person extends CrnkStoreResource {
	relationships?: Person.Relationships;
	attributes?: Person.Attributes;
}
export interface PersonResult extends OneQueryResult {
	data?: Person;
}
export interface PersonListResult extends ManyQueryResult {
	data?: Array<Person>;
}
export class QPerson extends BeanPath<Person> {
	metaId = 'resources.person';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QPerson.QRelationships = new QPerson.QRelationships(this, 'relationships');
	attributes: QPerson.QAttributes = new QPerson.QAttributes(this, 'attributes');
}
export module QPerson {
	export class QRelationships extends BeanPath<Person.Relationships> {
		private _roles: QTypedManyResourceRelationship<QRole, Role>;
		get roles(): QTypedManyResourceRelationship<QRole, Role> {
			if (!this._roles) {
				this._roles =
					new QTypedManyResourceRelationship<QRole, Role>(this, 'roles', QRole);
			}
			return this._roles;
		};
	}
	export class QAttributes extends BeanPath<Person.Attributes> {
		name: StringPath = this.createString('name');
		year: NumberPath = this.createNumber('year');
	}
}
export let createEmptyPerson = function(id: string): Person {
	return {
		id: id,
		type: 'person',
		attributes: {
		},
		relationships: {
			roles: {data: []},
		},
	};
};