import {
	BeanPath,
	CrnkStoreResource,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult
} from 'ngrx-json-api';

export module AttributeChange {
	export interface Attributes {
		attribute?: string;
		newValue?: string;
		oldValue?: string;
		changeTime?: string;
	}
}
export interface AttributeChange extends CrnkStoreResource {
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
	attributes: QAttributeChange.QAttributes = new QAttributeChange.QAttributes(this, 'attributes');
}
export module QAttributeChange {
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
	};
};