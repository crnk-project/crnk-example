import {
	BeanPath,
	CrnkStoreResource,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult
} from 'ngrx-json-api';

export module Secret {
	export interface Attributes {
		name?: string;
		value?: string;
	}
}
export interface Secret extends CrnkStoreResource {
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
	attributes: QSecret.QAttributes = new QSecret.QAttributes(this, 'attributes');
}
export module QSecret {
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
	};
};