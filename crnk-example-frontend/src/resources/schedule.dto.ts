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

export module ScheduleDto {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		attributeChanges?: TypedManyResourceRelationship<AttributeChange>;
	}
	export interface Attributes {
		name?: string;
		computedUpperName?: string;
		decoratedName?: string;
	}
}
export interface ScheduleDto extends CrnkStoreResource {
	relationships?: ScheduleDto.Relationships;
	attributes?: ScheduleDto.Attributes;
}
export interface ScheduleDtoResult extends OneQueryResult {
	data?: ScheduleDto;
}
export interface ScheduleDtoListResult extends ManyQueryResult {
	data?: Array<ScheduleDto>;
}
export class QScheduleDto extends BeanPath<ScheduleDto> {
	metaId = 'resources.scheduleDto';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QScheduleDto.QRelationships = new QScheduleDto.QRelationships(this, 'relationships');
	attributes: QScheduleDto.QAttributes = new QScheduleDto.QAttributes(this, 'attributes');
}
export module QScheduleDto {
	export class QRelationships extends BeanPath<ScheduleDto.Relationships> {
		private _attributeChanges: QTypedManyResourceRelationship<QAttributeChange, AttributeChange>;
		get attributeChanges(): QTypedManyResourceRelationship<QAttributeChange, AttributeChange> {
			if (!this._attributeChanges) {
				this._attributeChanges =
					new QTypedManyResourceRelationship<QAttributeChange, AttributeChange>(this, 'attributeChanges', QAttributeChange);
			}
			return this._attributeChanges;
		}
	}
	export class QAttributes extends BeanPath<ScheduleDto.Attributes> {
		name: StringPath = this.createString('name');
		computedUpperName: StringPath = this.createString('computedUpperName');
		decoratedName: StringPath = this.createString('decoratedName');
	}
}
export let createEmptyScheduleDto = function(id: string): ScheduleDto {
	return {
		id: id,
		type: 'scheduleDto',
		attributes: {
		},
		relationships: {
			attributeChanges: {data: []},
		},
	};
};