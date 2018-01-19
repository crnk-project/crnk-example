import {
	QTasks,
	Tasks
} from './tasks';
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

export module Projects {
	export interface Relationships {
		[key: string]: ResourceRelationship;
		tasks?: TypedManyResourceRelationship<Tasks>;
	}
	export interface Attributes {
		name?: string;
	}
}
export interface Projects extends CrnkStoreResource {
	relationships?: Projects.Relationships;
	attributes?: Projects.Attributes;
}
export interface ProjectsResult extends OneQueryResult {
	data?: Projects;
}
export module ProjectsListResult {
	export interface ProjectListLinks {
		first?: string;
		last?: string;
		next?: string;
		prev?: string;
	}
	export interface ProjectListMeta {
		totalResourceCount?: number;
	}
}
export interface ProjectsListResult extends ManyQueryResult {
	data?: Array<Projects>;
	links?: ProjectsListResult.ProjectListLinks;
	meta?: ProjectsListResult.ProjectListMeta;
}
export class QProjects extends BeanPath<Projects> {
	metaId = 'resources.projects';
	id: StringPath = this.createString('id');
	type: StringPath = this.createString('type');
	relationships: QProjects.QRelationships = new QProjects.QRelationships(this, 'relationships');
	attributes: QProjects.QAttributes = new QProjects.QAttributes(this, 'attributes');
}
export module QProjects {
	export class QRelationships extends BeanPath<Projects.Relationships> {
		private _tasks: QTypedManyResourceRelationship<QTasks, Tasks>;
		get tasks(): QTypedManyResourceRelationship<QTasks, Tasks> {
			if (!this._tasks) {
				this._tasks =
					new QTypedManyResourceRelationship<QTasks, Tasks>(this, 'tasks', QTasks);
			}
			return this._tasks;
		};
	}
	export class QAttributes extends BeanPath<Projects.Attributes> {
		name: StringPath = this.createString('name');
	}
}
export let createEmptyProjects = function(id: string): Projects {
	return {
		id: id,
		type: 'projects',
		attributes: {
		},
		relationships: {
			tasks: {data: []},
		},
	};
};