import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import '../rxjs-operators';
import {EffectsModule} from '@ngrx/effects';
import {NgModule} from '@angular/core';
import {MovieExplorerComponent, MovieEditorComponent} from '../movie';
import {ResourceResolve} from '../common/common.resource.resolver';
import {FormsModule} from '@angular/forms';
import {ArbErrorComponentModule} from '@adnovum/asap-resource-browser-module';
import {CrnkExpressionFormModule} from '@crnk/angular-ngrx';
import {ButtonModule} from 'primeng/components/button/button';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {NgrxJsonApiModule} from 'ngrx-json-api';
import {TranslateModule} from '@ngx-translate/core';

export const MOVIE_ROUTES: Routes = [
	{
		path: 'movie', component: MovieExplorerComponent,
		data: {
			resourceType: 'movie'
		},
		resolve: {
			queryId: ResourceResolve
		}
	},
	{
		path: 'movie/:id', component: MovieEditorComponent,
		data: {
			resourceType: 'movie'
		},
		resolve: {
			queryId: ResourceResolve
		}
	},
];


@NgModule({
	declarations: [
		MovieEditorComponent,
		MovieExplorerComponent,
	],
	providers: [ResourceResolve],
	imports: [
		StoreModule, RouterModule, FormsModule, EffectsModule, NgrxJsonApiModule,
		RouterModule.forChild(MOVIE_ROUTES), TranslateModule,

		DataTableModule, ButtonModule, InputTextModule,

		ArbErrorComponentModule,
		CrnkExpressionFormModule

	],
	exports: [
		DataTableModule, ButtonModule, InputTextModule,

		ArbErrorComponentModule, CrnkExpressionFormModule
	]
})
export class ManualModule {

}




