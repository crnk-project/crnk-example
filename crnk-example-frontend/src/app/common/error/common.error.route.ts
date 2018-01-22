import { Injectable, NgModule } from '@angular/core';
import { NavigationError, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgrxJsonApiService } from 'ngrx-json-api';
import { QueryError } from '@crnk/angular-ngrx';
import { Go } from '../router/common.router.navigation';


@Injectable()
export class AppErrorRoutingService {

	constructor(private store: Store<any>, router: Router, ngrxJsonApiService: NgrxJsonApiService) {
		router.events.forEach((event) => {
			if (event instanceof NavigationStart) {
				// TODO eliminate this
				ngrxJsonApiService.compact();
			}
			else if (event instanceof NavigationError) {
				const errorEvent = event as NavigationError;

				const withinErrorPage = errorEvent.url.toString().indexOf('error') !== -1;
				if (!withinErrorPage) {
					let errorPath = '/error/internal';
					if (errorEvent.error instanceof QueryError) {
						const queryError = errorEvent.error as QueryError;
						for (const resourceError of queryError.errors) {
							if (resourceError.code === '403') {
								errorPath = '/error/forbidden';
							}
							if (resourceError.code === '404') {
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