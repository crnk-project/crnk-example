import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgrxJsonApiService } from 'ngrx-json-api';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';
import { AppLoadingService, AppSnackBarService, AppErrorRoutingService } from './common';
import { Observable } from 'rxjs/Observable';
import { Login, LoginListResult } from '../resources';
import { AppLanguageService, LanguageCode } from './common/language/common.language';
import { getAppState } from './store';
import { Store } from '@ngrx/store';


@Component({
	selector: 'demo-app',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {

	login$: Observable<Login>;
	currentLanguage$: Observable<LanguageCode>;

	navItems = [
		{ name: 'Home', route: '/' },
		{ name: 'Movies', route: '/movie' },
		{ name: 'Persons', route: '/person' },
		{ name: 'Votes', route: '/vote' },
		{ name: 'Secrets', route: '/secret' }
	];

	constructor(
		store: Store<any>,
		public language: AppLanguageService, router: Router, jsonApi: NgrxJsonApiService,
		public loading: AppLoadingService,
		// listed here to force loading:
		snaback: AppSnackBarService,
		routingService: AppErrorRoutingService
	) {
		this.login$ = jsonApi.selectManyResults('loginQueryId')
			.map(it => it as LoginListResult)
			.map(it => {
			return it.data && it.data.length ? it.data[0] : undefined;
		});

		this.currentLanguage$ = store.select(getAppState).map(state => state.language);
		// make sure you use 2.8.1 version of earlier of moments, otherwise it will not be set globally
		// => see https://github.com/moment/moment/issues/1797
		this.currentLanguage$.subscribe(lang => moment.locale(lang));
	}

}
