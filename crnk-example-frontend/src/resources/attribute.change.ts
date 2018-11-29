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

export module AttributeChange {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		attributeChanges?: TypedManyResourceRelationship<AttributeChange>;
	}
	export interface Attributes {
		attribute?: string;
		newValue?: string;
		oldValue?: string;
		changeTime?: string;
	}
}
export interface AttributeChange extends CrnkStoreResource {
	relationships?: AttributeChange.Relationships;
	attributes?: AttributeChange.Attributes;
}
export interface AttributeChangeResult extends OneQueryResult {
	data?: AttributeChange;
}
export interface AttributeChangeListResult extends ManyQueryResult {
	data?: Array<AttributeChange>;
}
export class QAttributeChange extends BeanPath<AttributeChange> {
	metaId = 'resources.attributeChange';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QAttributeChange.QRelationships = new QAttributeChange.QRelationships(this, 'relationships');
	attributes: QAttributeChange.QAttributes = new QAttributeChange.QAttributes(this, 'attributes');
}
export module QAttributeChange {
	export class QRelationships extends BeanPath<AttributeChange.Relationships> {
		private _attributeChanges: QTypedManyResourceRelationship<QAttributeChange, AttributeChange>;
		get attributeChanges(): QTypedManyResourceRelationship<QAttributeChange, AttributeChange> {
			if (!this._attributeChanges) {
				this._attributeChanges =
					new QTypedManyResourceRelationship<QAttributeChange, AttributeChange>(this, 'attributeChanges', QAttributeChange);
			}
			return this._attributeChanges;
		}
	}
	export class QAttributes extends BeanPath<AttributeChange.Attributes> {
		attribute: StringPath = this.createString('attribute');
		newValue: StringPath = this.createString('newValue');
		oldValue: StringPath = this.createString('oldValue');
		changeTime: StringPath = this.createString('changeTime');
	}
}
export let createEmptyAttributeChange = function(id: string): AttributeChange {
	return {
		id: id,
		type: 'attributeChange',
		attributes: {
		},
		relationships: {
			attributeChanges: {data: []},
		},
	};
};