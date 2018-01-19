import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER, Component, NgModule} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NgrxJsonApiModule, NgrxJsonApiService} from 'ngrx-json-api';
import {HomeComponent} from './home';
import {environment} from '../environments/environment';
import {ROUTES} from './app.routes';
import {
	ArbAppModule,
	ArbMissingTranslationHandler,
	PresentationRouteFactoryService,
	ViewService
} from '@adnovum/asap-resource-browser-module';
import {CRNK_URL_BUILDER, CrnkOperationsModule, OperationsEffects} from '@crnk/angular-ngrx';
import {AppLabelModule} from './customizations/app.custom.labels';
import {AppLayoutModule} from './customizations/app.custom.layout';
import {AppMenuModule} from './customizations/app.custom.menu';
import {AppBrandingModule} from './customizations/app.custom.branding';
import {AppComponentModule} from './customizations/app.custom.component';
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';
import {ManualModule} from './manual/';
import {ArbDataUniverseModule} from './customizations/arb.plugin.data.universe';
import {ArbMonitorModule} from './customizations/arb.plugin.monitor';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EmbeddedModule} from './embedded/embedded.module';
import {HttpClient} from '@angular/common/http';

// tag::loadViews[]
export function loadViewRoutes(
	viewService: ViewService,
	routeFactory: PresentationRouteFactoryService
) {
	return () => {
		return routeFactory.buildDefaultRoutes()
			.do(routes => viewService.addViewRoutes({routes: routes}))
			.take(1)
			.toPromise();
	};
}

// end::loadViews[]

// tag::translation[]
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

// end::translation[]


export const reducers: ActionReducerMap<any> = {};


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent
	],
	// tag::modules[]
	imports: [
		BrowserModule,
		RouterModule.forRoot(ROUTES, {useHash: true}),
		BrowserAnimationsModule,

		// json api
		NgrxJsonApiModule.configure({
			apiUrl: environment['asap.resource.browser.demo.server.url'],
			resourceDefinitions: [],
			urlBuilder: CRNK_URL_BUILDER,
			applyEnabled: false
		}),
		StoreModule.forRoot(reducers, {initialState: {}}),
		EffectsModule.forRoot([OperationsEffects]),
		!environment.production ? StoreDevtoolsModule.instrument() : [],

		// translations/labels
		TranslateModule.forRoot({
			missingTranslationHandler: {provide: MissingTranslationHandler, useClass: ArbMissingTranslationHandler},
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),

		// asap resource browser
		ArbAppModule,
		CrnkOperationsModule,

		// customizations
		AppMenuModule, AppLayoutModule, AppLabelModule,
		AppBrandingModule, AppComponentModule,

		// manual and embedded screens
		ManualModule,
		EmbeddedModule,

		ArbDataUniverseModule,
		ArbMonitorModule

	],
	// end::modules[]
	// tag::providers[]
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: loadViewRoutes,
			deps: [ViewService, PresentationRouteFactoryService],
			multi: true
		}
	],
	// end::providers[]
	bootstrap: [
		AppComponent
	]
})
export class AppModule {

}





