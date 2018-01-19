import * as _ from 'lodash';
import {NgModule} from '@angular/core';
import {ARB_LABEL_FACTORY} from '@adnovum/asap-resource-browser-module';
import {NgrxJsonApiService, FilteringParam} from 'ngrx-json-api';

// tag::labels[]
const idFilterFactory = function (queryTerm): FilteringParam {
	return {
		path: 'id',
		operator: 'LIKE',
		value: '%' + queryTerm + '%'
	};
};
// end::labels[]

const nameFilterFactory = function (queryTerm): FilteringParam {
	return {
		path: 'name',
		operator: 'LIKE',
		value: '%' + queryTerm + '%'
	};
};

// tag::labels[]
const titleFilterFactory = function (queryTerm): FilteringParam {
	return {
		path: 'title',
		operator: 'LIKE',
		value: '%' + queryTerm + '%'
	};
};

const getValue = function (service, obj, path) {
	const snapshot = service.getResourceSnapshot(obj);
	if (snapshot) {
		return _.get(snapshot, path);
	}
	return '<<not loaded>>';

};

export function createLabelsRegistrations(service: NgrxJsonApiService) {
	return [
		{type: 'configuration', textFactory: (obj) => obj.id, filterFactory: idFilterFactory},
		// end::labels[]

		{type: 'vote', textFactory: (obj) => obj.id, filterFactory: idFilterFactory},
		{type: 'languageCode', textFactory: (obj) => obj.id, filterFactory: idFilterFactory},
		{type: 'countryCode', textFactory: (obj) => obj.id, filterFactory: idFilterFactory},
		{type: 'mimeTypeCode', textFactory: (obj) => obj.id, filterFactory: idFilterFactory},
		{type: 'movieGenreCode', textFactory: (obj) => obj.id, filterFactory: idFilterFactory},
		{type: 'movieGenreCode', textFactory: (obj) => obj.id, filterFactory: idFilterFactory},
		{type: 'monitor/metric/gauge', textFactory: (obj) => obj.id, filterFactory: idFilterFactory},
		{type: 'monitor/health', textFactory: (obj) => obj.id, filterFactory: idFilterFactory},

		{
			type: 'auditedChange',
			textFactory: (obj) => getValue(service, obj, ['attributes', 'id']),
			filterFactory: idFilterFactory
		},
		{
			type: 'auditedSession',
			textFactory: (obj) => getValue(service, obj, ['attributes', 'id']),
			filterFactory: idFilterFactory
		},

		{
			type: 'person',
			textFactory: (obj) => getValue(service, obj, ['attributes', 'name']),
			filterFactory: nameFilterFactory
		},
		{
			type: 'actorRole',
			textFactory: (obj) => getValue(service, obj, ['attributes', 'name']),
			filterFactory: nameFilterFactory
		},
		{
			type: 'rottenTomatoes',
			textFactory: (obj) => getValue(service, obj, ['id']),
			filterFactory: nameFilterFactory
		},
		{
			type: 'poster',
			textFactory: (obj) => getValue(service, obj, ['attributes', 'name']),
			filterFactory: nameFilterFactory
		},
		{
			type: 'episode',
			textFactory: (obj) => getValue(service, obj, ['attributes', 'title']),
			filterFactory: titleFilterFactory
		},
		// tag::labels[]
		{
			type: 'movie',
			textFactory: (obj) => getValue(service, obj, ['attributes', 'title']),
			filterFactory: titleFilterFactory
		}
	];
}

// end::labels[]

// tag::module[]
@NgModule({
	providers: [
		{
			useFactory: createLabelsRegistrations,
			provide: ARB_LABEL_FACTORY,
			multi: true,
			deps: [NgrxJsonApiService]
		}
	],
})
export class AppLabelModule {

}

// end::module[]



