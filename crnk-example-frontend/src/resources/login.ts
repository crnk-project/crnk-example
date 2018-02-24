import {
	History,
	QHistory
} from './history';
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
		history?: TypedManyResourceRelationship<History>;
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
		private _history: QTypedManyResourceRelationship<QHistory, History>;
		get history(): QTypedManyResourceRelationship<QHistory, History> {
			if (!this._history) {
				this._history =
					new QTypedManyResourceRelationship<QHistory, History>(this, 'history', QHistory);
			}
			return this._history;
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
			history: {data: []},
		},
	};
};