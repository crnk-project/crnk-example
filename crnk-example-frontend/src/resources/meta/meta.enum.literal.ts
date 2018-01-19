import {
	MetaElement,
	QMetaElement
} from './meta.element';
import {
	BeanPath,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult
} from 'ngrx-json-api';

export interface MetaEnumLiteral extends MetaElement {
}
export interface MetaEnumLiteralResult extends OneQueryResult {
	data?: MetaEnumLiteral;
}
export interface MetaEnumLiteralListResult extends ManyQueryResult {
	data?: Array<MetaEnumLiteral>;
}
export class QMetaEnumLiteral extends BeanPath<MetaEnumLiteral> {
	metaId = 'resources.meta.enumLiteral';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QMetaElement.QRelationships = new QMetaElement.QRelationships(this, 'relationships');
	attributes: QMetaElement.QAttributes = new QMetaElement.QAttributes(this, 'attributes');
}
export let createEmptyMetaEnumLiteral = function(id: string): MetaEnumLiteral {
	return {
		id: id,
		type: 'meta/enumLiteral',
	};
};