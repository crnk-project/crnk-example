import {
	BeanPath,
	CrnkStoreResource,
	NumberPath,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult
} from 'ngrx-json-api';

export module Vote {
	export interface Attributes {
		name?: string;
		count?: number;
	}
}
export interface Vote extends CrnkStoreResource {
	attributes?: Vote.Attributes;
}
export interface VoteResult extends OneQueryResult {
	data?: Vote;
}
export interface VoteListResult extends ManyQueryResult {
	data?: Array<Vote>;
}
export class QVote extends BeanPath<Vote> {
	metaId = 'resources.vote';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	attributes: QVote.QAttributes = new QVote.QAttributes(this, 'attributes');
}
export module QVote {
	export class QAttributes extends BeanPath<Vote.Attributes> {
		name: StringPath = this.createString('name');
		count: NumberPath = this.createNumber('count');
	}
}
export let createEmptyVote = function(id: string): Vote {
	return {
		id: id,
		type: 'vote',
		attributes: {
		},
	};
};