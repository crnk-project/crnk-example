import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgrxJsonApiService } from 'ngrx-json-api';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';
import { AppSnackBarService } from './common/snackbar';
import { AppLoadingService } from './common/loading';


@Component({
	selector: 'demo-app',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

	navItems = [
		{ name: 'Home', route: '/' },
		{ name: 'Movies', route: '/movie' },
		{ name: 'Persons', route: '/person' },
		{ name: 'Votes', route: '/vote' }
	];



	constructor(
		translate: TranslateService, router: Router, jsonApi: NgrxJsonApiService, snaback: AppSnackBarService,
		public loading: AppLoadingService
	) {
		translate.addLangs(['en', 'fr']);
		translate.setDefaultLang('en');
		const browserLang = translate.getBrowserLang();
		const lang = browserLang.match(/en|fr/) ? browserLang : 'en';
		translate.use(lang);

		// make sure you use 2.8.1 version of earlier of moments, otherwise it will not be set globally
		// => see https://github.com/moment/moment/issues/1797
		moment.locale(lang);
	}
}
