import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import {
	MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule,
	MatSidenavModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PersonModule } from './person';


export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
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
		PersonModule,
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
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		*/
		/*
		MatSliderModule,
		MatSlideToggleModule,
		MatSnackBarModule,

		MatStepperModule,
		*/

	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {

}





