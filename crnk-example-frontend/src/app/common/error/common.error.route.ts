import { Injectable } from '@angular/core';
import { NavigationError, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgrxJsonApiService } from 'ngrx-json-api';
import { QueryError } from '@crnk/angular-ngrx';
import { Go } from '../router/common.router.navigation';
import { APP_JSON_API_EDITOR_ZONE } from '../common.resource.resolver';
import * as _ from 'lodash';

@Injectable()
export class AppErrorRoutingService {

	constructor(private store: Store<any>, router: Router, ngrxJsonApiService: NgrxJsonApiService) {
		router.events.forEach((event) => {
			if (event instanceof NavigationStart) {
				// TODO consider more advanced garbage collection/caching strategy
				const defaultZone = ngrxJsonApiService.getDefaultZone();
				const editorZone = ngrxJsonApiService.getZone(APP_JSON_API_EDITOR_ZONE);
				defaultZone.compact();
				editorZone.clear();
			}
			else if (event instanceof NavigationError) {
				const errorEvent = event as NavigationError;
				const withinErrorPage = errorEvent.url.toString().indexOf('error') !== -1;
				if (!withinErrorPage) {
					let errorPath = '/error/internal';
					// TODO errorEvent.error instanceof QueryError not working, why?
					if (errorEvent.error && _.isArray(errorEvent.error['errors'])) {
						const queryError = errorEvent.error as QueryError;
						for (const resourceError of queryError.errors) {
							if (resourceError.status === '403') {
								errorPath = '/error/forbidden';
							}
							if (resourceError.status === '404') {
								errorPath = '/error/notfound';
							}
						}
					}

					store.dispatch(new Go({
						path: [errorPath]
					}));
				}
			}
		});
	}
}