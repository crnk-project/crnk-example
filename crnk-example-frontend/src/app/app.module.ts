import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgrxJsonApiModule } from 'ngrx-json-api';
import { HomeComponent } from './home';
import { environment } from '../environments/environment';
import { ROUTES } from './app.routes';
import { CRNK_URL_BUILDER, CrnkOperationsModule, OperationsEffects } from '@crnk/angular-ngrx';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppStoreModule } from './store/store.module';
import { AppCommonModule } from './common/common.module';
import { MovieModule } from './movie/movie.module';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import {
	MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule,
	MatProgressBarModule,
	MatSidenavModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PersonModule } from './person';
import { VoteModule } from './vote';
import { SecretModule } from './secret';
import { LoginService } from './common/login/common.login';


export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export function load_login(loginService: LoginService) {
	return () => loginService.retrieveDetails();
}

export const reducers: ActionReducerMap<any> = {};

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,

		HttpClientModule,

		NgrxJsonApiModule.configure({
			apiUrl: environment['demo.server.url'],
			resourceDefinitions: [],
			urlBuilder: CRNK_URL_BUILDER,
			applyEnabled: false
		}),
		StoreModule.forRoot(reducers, { initialState: {} }),
		EffectsModule.forRoot([OperationsEffects]),
		CrnkOperationsModule,
		!environment.production ? StoreDevtoolsModule.instrument() : [],

		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),


		AppCommonModule,
		MovieModule,
		VoteModule,
		PersonModule,
		SecretModule,
		AppStoreModule,

		RouterModule.forRoot(ROUTES, { useHash: true }),

		MatSidenavModule,
		MatIconModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDialogModule,
		MatSortModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
		MatListModule,
		MatSnackBarModule,
		MatProgressBarModule,


		/*
		MatAutocompleteModule,
		MatButtonToggleModule,

		MatChipsModule,
		MatDatepickerModule,
		MatExpansionModule,
		MatGridListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		*/
		/*
		MatSliderModule,
		MatSlideToggleModule,
		MatStepperModule,
		*/

	],
	providers: [
		{
			provide: APP_BASE_HREF,
			useValue: '/'
		},
		LoginService,
		{
			provide: APP_INITIALIZER,
			useFactory: load_login,
			deps: [LoginService],
			multi: true
		}
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {

}





