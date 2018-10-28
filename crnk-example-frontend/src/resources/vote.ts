import {
	AttributeChange,
	QAttributeChange
} from './attribute.change';
import {
	Movie,
	QMovie
} from './movie';
import {
	BeanPath,
	CrnkStoreResource,
	NumberPath,
	QTypedManyResourceRelationship,
	QTypedOneResourceRelationship,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult,
	ResourceRelationship,
	TypedManyResourceRelationship,
	TypedOneResourceRelationship
} from 'ngrx-json-api';

export module Vote {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		movie?: TypedOneResourceRelationship<Movie>;
		attributeChanges?: TypedManyResourceRelationship<AttributeChange>;
	}
	export interface Attributes {
		count?: number;
	}
}
export interface Vote extends CrnkStoreResource {
	relationships?: Vote.Relationships;
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
	relationships: QVote.QRelationships = new QVote.QRelationships(this, 'relationships');
	attributes: QVote.QAttributes = new QVote.QAttributes(this, 'attributes');
}
export module QVote {
	export class QRelationships extends BeanPath<Vote.Relationships> {
		private _movie: QTypedOneResourceRelationship<QMovie, Movie>;
		get movie(): QTypedOneResourceRelationship<QMovie, Movie> {
			if (!this._movie) {
				this._movie =
					new QTypedOneResourceRelationship<QMovie, Movie>(this, 'movie', QMovie);
			}
			return this._movie;
		};
		private _attributeChanges: QTypedManyResourceRelationship<QAttributeChange, AttributeChange>;
		get attributeChanges(): QTypedManyResourceRelationship<QAttributeChange, AttributeChange> {
			if (!this._attributeChanges) {
				this._attributeChanges =
					new QTypedManyResourceRelationship<QAttributeChange, AttributeChange>(this, 'attributeChanges', QAttributeChange);
			}
			return this._attributeChanges;
		};
	}
	export class QAttributes extends BeanPath<Vote.Attributes> {
		count: NumberPath = this.createNumber('count');
	}
}
export let createEmptyVote = function(id: string): Vote {
	return {
		id: id,
		type: 'vote',
		attributes: {
		},
		relationships: {
			movie: {data: null},
			attributeChanges: {data: []},
		},
	};
};