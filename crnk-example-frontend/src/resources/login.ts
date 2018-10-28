import {
	AttributeChange,
	QAttributeChange
} from './attribute.change';
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

export module Login {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		attributeChanges?: TypedManyResourceRelationship<AttributeChange>;
	}
	export interface Attributes {
		userName?: string;
	}
}
export interface Login extends CrnkStoreResource {
	relationships?: Login.Relationships;
	attributes?: Login.Attributes;
}
export interface LoginResult extends OneQueryResult {
	data?: Login;
}
export interface LoginListResult extends ManyQueryResult {
	data?: Array<Login>;
}
export class QLogin extends BeanPath<Login> {
	metaId = 'resources.login';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QLogin.QRelationships = new QLogin.QRelationships(this, 'relationships');
	attributes: QLogin.QAttributes = new QLogin.QAttributes(this, 'attributes');
}
export module QLogin {
	export class QRelationships extends BeanPath<Login.Relationships> {
		private _attributeChanges: QTypedManyResourceRelationship<QAttributeChange, AttributeChange>;
		get attributeChanges(): QTypedManyResourceRelationship<QAttributeChange, AttributeChange> {
			if (!this._attributeChanges) {
				this._attributeChanges =
					new QTypedManyResourceRelationship<QAttributeChange, AttributeChange>(this, 'attributeChanges', QAttributeChange);
			}
			return this._attributeChanges;
		};
	}
	export class QAttributes extends BeanPath<Login.Attributes> {
		userName: StringPath = this.createString('userName');
	}
}
export let createEmptyLogin = function(id: string): Login {
	return {
		id: id,
		type: 'login',
		attributes: {
		},
		relationships: {
			attributeChanges: {data: []},
		},
	};
};