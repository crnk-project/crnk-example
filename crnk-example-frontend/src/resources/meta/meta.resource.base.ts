import {QMetaDataObject} from './meta.data.object';
import {MetaJsonObject} from './meta.json.object';
import {
	BeanPath,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult
} from 'ngrx-json-api';

export interface MetaResourceBase extends MetaJsonObject {
}
export interface MetaResourceBaseResult extends OneQueryResult {
	data?: MetaResourceBase;
}
export interface MetaResourceBaseListResult extends ManyQueryResult {
	data?: Array<MetaResourceBase>;
}
export class QMetaResourceBase extends BeanPath<MetaResourceBase> {
	metaId = 'resources.meta.resourceBase';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QMetaDataObject.QRelationships = new QMetaDataObject.QRelationships(this, 'relationships');
	attributes: QMetaDataObject.QAttributes = new QMetaDataObject.QAttributes(this, 'attributes');
}
export let createEmptyMetaResourceBase = function(id: string): MetaResourceBase {
	return {
		id: id,
		type: 'meta/resourceBase',
	};
};