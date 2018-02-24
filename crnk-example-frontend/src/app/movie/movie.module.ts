import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import '../rxjs-operators';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { MovieExplorerComponent, MovieEditorComponent } from '../movie';
import { AppResourceResolve } from '../common/common.resource.resolver';
import { FormsModule } from '@angular/forms';
import { CrnkExpressionFormModule } from '@crnk/angular-ngrx';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { NgrxJsonApiModule } from 'ngrx-json-api';
import { TranslateModule } from '@ngx-translate/core';
import { AppCommonModule } from '../common';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { ProtectedGuard } from 'ngx-auth';

export const MOVIE_ROUTES: Routes = [
	{
		path: 'movie', component: MovieExplorerComponent,
		canActivate: [ ProtectedGuard ],
		data: {
			resourceType: 'movie'
		},
		resolve: {
			queryId: AppResourceResolve
		}
	},
	{
		path: 'movie/:id', component: MovieEditorComponent,
		data: {
			resourceType: 'movie'
		},
		resolve: {
			queryId: AppResourceResolve
		}
	},
];


@NgModule({
	declarations: [
		MovieEditorComponent,
		MovieExplorerComponent,
	],
	imports: [
		CommonModule,
		StoreModule, RouterModule, FormsModule, EffectsModule, NgrxJsonApiModule,
		RouterModule.forChild(MOVIE_ROUTES), TranslateModule,

		MatButtonModule, MatInputModule, MatSnackBarModule,

		DataTableModule, ButtonModule, InputTextModule,
		AppCommonModule,
		CrnkExpressionFormModule

	],
	exports: [
		DataTableModule, ButtonModule, InputTextModule,
		AppCommonModule, CrnkExpressionFormModule
	]
})
export class MovieModule {

}




