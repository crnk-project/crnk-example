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
import { SecretExplorerComponent } from './secret.explorer.component';
import { ProtectedGuard } from 'ngx-auth';

export const PERSON_ROUTES: Routes = [
	{
		path: 'secret', component: SecretExplorerComponent,
		canActivate: [ ProtectedGuard ],
		data: {
			resourceType: 'secret'
		},
		resolve: {
			queryId: AppResourceResolve
		}
	}
];


@NgModule({
	declarations: [
		SecretExplorerComponent
	],
	imports: [
		CommonModule,
		StoreModule, RouterModule, FormsModule, EffectsModule, NgrxJsonApiModule,
		RouterModule.forChild(PERSON_ROUTES), TranslateModule,

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
export class SecretModule {

}




