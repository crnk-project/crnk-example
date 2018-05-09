import {
	BeanPath,
	CrnkStoreResource,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult
} from 'ngrx-json-api';

export module Login {
	export interface Attributes {
		userName?: string;
	}
}
export interface Login extends CrnkStoreResource {
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
	attributes: QLogin.QAttributes = new QLogin.QAttributes(this, 'attributes');
}
export module QLogin {
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
	};
};