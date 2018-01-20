import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgrxJsonApiModule, NgrxJsonApiService } from 'ngrx-json-api';
import { HomeComponent } from './home';
import { environment } from '../environments/environment';
import { ROUTES } from './app.routes';
import { CRNK_URL_BUILDER, CrnkOperationsModule, OperationsEffects } from '@crnk/angular-ngrx';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';
import { ManualModule } from './manual/';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClient } from '@angular/common/http';


export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@Component({
	selector: 'demo-app',
	template: '<arb-app-layout></arb-app-layout>'
})
export class AppComponent {

	constructor(translate: TranslateService, router: Router, jsonApi: NgrxJsonApiService) {
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

export const reducers: ActionReducerMap<any> = {};

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(ROUTES, { useHash: true }),
		BrowserAnimationsModule,

		NgrxJsonApiModule.configure({
			apiUrl: environment['asap.resource.browser.demo.server.url'],
			resourceDefinitions: [],
			urlBuilder: CRNK_URL_BUILDER,
			applyEnabled: false
		}),
		StoreModule.forRoot(reducers, { initialState: {} }),
		EffectsModule.forRoot([OperationsEffects]),
		!environment.production ? StoreDevtoolsModule.instrument() : [],

		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),

		CrnkOperationsModule,
		ManualModule,

	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {

}





