import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import '../rxjs-operators';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
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
import { MatButtonModule, MatInputModule } from '@angular/material';
import { VoteExplorerComponent } from './vote.explorer.component';

export const VOTE_ROUTES: Routes = [
	{
		path: 'vote', component: VoteExplorerComponent,
		data: {
			resourceType: 'vote'
		},
		resolve: {
			queryId: AppResourceResolve
		}
	}
];


@NgModule({
	declarations: [
		VoteExplorerComponent
	],
	imports: [
		CommonModule,
		StoreModule, RouterModule, FormsModule, EffectsModule, NgrxJsonApiModule,
		RouterModule.forChild(VOTE_ROUTES), TranslateModule,

		MatButtonModule, MatInputModule,

		DataTableModule, ButtonModule, InputTextModule,
		AppCommonModule,
		CrnkExpressionFormModule

	],
	exports: [
		DataTableModule, ButtonModule, InputTextModule,
		AppCommonModule, CrnkExpressionFormModule
	]
})
export class VoteModule {

}




