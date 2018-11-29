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

export module Secret {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		attributeChanges?: TypedManyResourceRelationship<AttributeChange>;
	}
	export interface Attributes {
		name?: string;
		value?: string;
	}
}
export interface Secret extends CrnkStoreResource {
	relationships?: Secret.Relationships;
	attributes?: Secret.Attributes;
}
export interface SecretResult extends OneQueryResult {
	data?: Secret;
}
export interface SecretListResult extends ManyQueryResult {
	data?: Array<Secret>;
}
export class QSecret extends BeanPath<Secret> {
	metaId = 'resources.secret';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QSecret.QRelationships = new QSecret.QRelationships(this, 'relationships');
	attributes: QSecret.QAttributes = new QSecret.QAttributes(this, 'attributes');
}
export module QSecret {
	export class QRelationships extends BeanPath<Secret.Relationships> {
		private _attributeChanges: QTypedManyResourceRelationship<QAttributeChange, AttributeChange>;
		get attributeChanges(): QTypedManyResourceRelationship<QAttributeChange, AttributeChange> {
			if (!this._attributeChanges) {
				this._attributeChanges =
					new QTypedManyResourceRelationship<QAttributeChange, AttributeChange>(this, 'attributeChanges', QAttributeChange);
			}
			return this._attributeChanges;
		}
	}
	export class QAttributes extends BeanPath<Secret.Attributes> {
		name: StringPath = this.createString('name');
		value: StringPath = this.createString('value');
	}
}
export let createEmptySecret = function(id: string): Secret {
	return {
		id: id,
		type: 'secret',
		attributes: {
		},
		relationships: {
			attributeChanges: {data: []},
		},
	};
};