import {
	Projects,
	QProjects
} from './projects';
import {
	BeanPath,
	CrnkStoreResource,
	QTypedOneResourceRelationship,
	StringPath
} from '@crnk/angular-ngrx';
import {
	ManyQueryResult,
	OneQueryResult,
	ResourceRelationship,
	TypedOneResourceRelationship
} from 'ngrx-json-api';

export module Tasks {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		project?: TypedOneResourceRelationship<Projects>;
	}
	export interface Attributes {
		name?: string;
		description?: string;
	}
}
export interface Tasks extends CrnkStoreResource {
	relationships?: Tasks.Relationships;
	attributes?: Tasks.Attributes;
}
export interface TasksResult extends OneQueryResult {
	data?: Tasks;
}
export interface TasksListResult extends ManyQueryResult {
	data?: Array<Tasks>;
}
export class QTasks extends BeanPath<Tasks> {
	metaId = 'resources.tasks';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QTasks.QRelationships = new QTasks.QRelationships(this, 'relationships');
	attributes: QTasks.QAttributes = new QTasks.QAttributes(this, 'attributes');
}
export module QTasks {
	export class QRelationships extends BeanPath<Tasks.Relationships> {
		private _project: QTypedOneResourceRelationship<QProjects, Projects>;
		get project(): QTypedOneResourceRelationship<QProjects, Projects> {
			if (!this._project) {
				this._project =
					new QTypedOneResourceRelationship<QProjects, Projects>(this, 'project', QProjects);
			}
			return this._project;
		};
	}
	export class QAttributes extends BeanPath<Tasks.Attributes> {
		name: StringPath = this.createString('name');
		description: StringPath = this.createString('description');
	}
}
export let createEmptyTasks = function(id: string): Tasks {
	return {
		id: id,
		type: 'tasks',
		attributes: {
		},
		relationships: {
			project: {data: null},
		},
	};
};