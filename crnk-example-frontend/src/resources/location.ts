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

export module Location {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		attributeChanges?: TypedManyResourceRelationship<AttributeChange>;
	}
}
export interface Location extends CrnkStoreResource {
	relationships?: Location.Relationships;
}
export interface LocationResult extends OneQueryResult {
	data?: Location;
}
export interface LocationListResult extends ManyQueryResult {
	data?: Array<Location>;
}
export class QLocation extends BeanPath<Location> {
	metaId = 'resources.location';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QLocation.QRelationships = new QLocation.QRelationships(this, 'relationships');
}
export module QLocation {
	export class QRelationships extends BeanPath<Location.Relationships> {
		private _attributeChanges: QTypedManyResourceRelationship<QAttributeChange, AttributeChange>;
		get attributeChanges(): QTypedManyResourceRelationship<QAttributeChange, AttributeChange> {
			if (!this._attributeChanges) {
				this._attributeChanges =
					new QTypedManyResourceRelationship<QAttributeChange, AttributeChange>(this, 'attributeChanges', QAttributeChange);
			}
			return this._attributeChanges;
		};
	}
}
export let createEmptyLocation = function(id: string): Location {
	return {
		id: id,
		type: 'location',
		relationships: {
			attributeChanges: {data: []},
		},
	};
};