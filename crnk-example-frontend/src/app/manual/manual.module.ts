import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import '../rxjs-operators';
import {EffectsModule} from '@ngrx/effects';
import {NgModule} from '@angular/core';
import {PersonExplorerComponent, PersonEditorComponent} from './person';
import {MovieExplorerComponent, MovieEditorComponent} from './movie';
import {ResourceResolve} from './manual.resolver';
import {FormsModule} from '@angular/forms';
import {ArbErrorComponentModule} from '@adnovum/asap-resource-browser-module';
import {CrnkExpressionFormModule} from '@crnk/angular-ngrx';
import {
	ArbpFormComponentModule,
	ArbpFormBaseComponentModule
} from '@adnovum/asap-resource-browser-module';
import {ButtonModule} from 'primeng/components/button/button';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {NgrxJsonApiModule} from 'ngrx-json-api';
import {TranslateModule} from '@ngx-translate/core';

export const MANUAL_ROUTES: Routes = [
	{
		path: 'manual/manualPerson', component: PersonExplorerComponent,
		data: {
			resourceType: 'person'
		},
		resolve: {
			queryId: ResourceResolve
		}
	},
	{
		path: 'manual/manualPerson/:id', component: PersonEditorComponent,
		data: {
			resourceType: 'person'
		},
		resolve: {
			queryId: ResourceResolve
		}
	},
	{
		path: 'manual/manualMovie', component: MovieExplorerComponent,
		data: {
			resourceType: 'movie'
		},
		resolve: {
			queryId: ResourceResolve
		}
	},
	{
		path: 'manual/manualMovie/:id', component: MovieEditorComponent,
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
		PersonEditorComponent,
		PersonExplorerComponent,
		MovieEditorComponent,
		MovieExplorerComponent,
	],
	providers: [ResourceResolve],
	imports: [
		StoreModule, RouterModule, FormsModule, EffectsModule, NgrxJsonApiModule,
		RouterModule.forChild(MANUAL_ROUTES), TranslateModule,

		DataTableModule, ButtonModule, InputTextModule,

		ArbErrorComponentModule,
		CrnkExpressionFormModule, ArbpFormComponentModule, ArbpFormBaseComponentModule

	],
	exports: [
		DataTableModule, ButtonModule, InputTextModule,

		ArbErrorComponentModule, CrnkExpressionFormModule
	]
})
export class ManualModule {

}




