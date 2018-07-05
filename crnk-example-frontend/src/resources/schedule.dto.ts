import {
	BeanPath,
	CrnkStoreResource,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult
} from 'ngrx-json-api';

export module ScheduleDto {
	export interface Attributes {
		name?: string;
		computedUpperName?: string;
		decoratedName?: string;
	}
}
export interface ScheduleDto extends CrnkStoreResource {
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
	attributes: QScheduleDto.QAttributes = new QScheduleDto.QAttributes(this, 'attributes');
}
export module QScheduleDto {
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
	};
};