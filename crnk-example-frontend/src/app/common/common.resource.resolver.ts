import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import '../rxjs-operators';
import { Query, NgrxJsonApiService, uuid, NGRX_JSON_API_DEFAULT_ZONE } from 'ngrx-json-api';
import { waitWhileLoading, assumeNoError } from '@crnk/angular-ngrx/binding';
import { createEmptyMovie } from 'resources';
import { SetCurrentResourceAction } from '../store';


export const APP_JSON_API_EDITOR_ZONE = 'editor'

/**
 * Resolves resources for editors and explorers.
 */
@Injectable()
export class AppResourceResolve implements Resolve<string> {

	constructor(private store: Store<any>, private jsonApi: NgrxJsonApiService) {
	}

	resolve(route: ActivatedRouteSnapshot) {
		const id = route.params['id'];
		const type = route.data['resourceType'];
		const isNew = id === 'create';
		const queryId = type + (id ? '_' + id : '_list');

		// load editor contents in isolated zone
		const zoneId = id ? APP_JSON_API_EDITOR_ZONE : NGRX_JSON_API_DEFAULT_ZONE
		const zone = this.jsonApi.getZone(zoneId);

		const query: Query = {
			queryId: queryId,
			type: type,
			id: id,
			params: {
				offset: 0,
				limit: 10,
				include: []
			}
		};
		if (query.type === 'movie') {
			//query.params.include.push('genres', 'directors', 'actors', 'writers', 'languages', 'countries');
		}

		if (isNew) {
			// put empty resource into the store
			const emptyFactories = {
				movie: createEmptyMovie
			};
			query.id = uuid();
			const emptyResource = emptyFactories[type](query.id);
			zone.postResource({
				resource: emptyResource
			});
		}

		this.store.dispatch(new SetCurrentResourceAction(query.type, query.id, isNew));

		zone.putQuery({
			query: query,
			fromServer: !isNew
		});

		// wait displaying the page till query successfully completed
		// throws an Error in case of a JSON API error. Can be generically handled by listing to route changes
		// TODO implement selectResult covering many and one

		const results$ = id ? zone.selectOneResults(queryId) : zone.selectManyResults(queryId);
		return results$
			.let(waitWhileLoading())
			.let(assumeNoError())
			.map(() => queryId)
			.take(1);
	}
}


