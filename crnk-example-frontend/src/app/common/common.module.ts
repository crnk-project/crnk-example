import { RouterModule, Routes } from '@angular/router';
import '../rxjs-operators';
import { NgModule } from '@angular/core';
import { AppResourceResolve } from './common.resource.resolver';
import { FormsModule } from '@angular/forms';
import { CrnkBindingModule } from '@crnk/angular-ngrx';
import { MessagesModule } from 'primeng/components/messages/messages';
import {
	ControlErrorsComponent, ErrorComponent, ErrorsComponent, InternalErrorComponent, NoContentComponent,
	NotAuthorizedComponent, ResourceErrorsComponent
} from './error/';
import { CommonModule } from '@angular/common';
import { RouterEffects } from './router/common.router.navigation';
import { EffectsModule } from '@ngrx/effects';
import { AppSnackBarService } from './snackbar';
import { AppErrorRoutingService } from './error/common.error.route';
import { AppLoadingService } from './loading';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
import { CommonAuthModule } from './auth/common.auth.module';
import { AppLanguageService } from './language/common.language';

export const ERROR_ROUTES: Routes = [
	{
		path: 'error/forbidden',
		canActivate: [PublicGuard],
		component: NotAuthorizedComponent
	},
	{
		path: 'error/notfound',
		canActivate: [PublicGuard],
		component: NoContentComponent
	},
	{
		path: 'error/internal',
		canActivate: [PublicGuard],
		component: InternalErrorComponent
	}
];

@NgModule({
	imports: [CommonModule, MessagesModule,
		CrnkBindingModule, FormsModule, CommonAuthModule,

		MatButtonModule, MatInputModule, TranslateModule,

		RouterModule.forChild(ERROR_ROUTES),
		EffectsModule.forFeature([RouterEffects])
	],
	declarations: [
		NoContentComponent, NotAuthorizedComponent, InternalErrorComponent,
		ErrorComponent, ControlErrorsComponent, ResourceErrorsComponent, ErrorsComponent
	],
	exports: [NoContentComponent, NotAuthorizedComponent, InternalErrorComponent,
		ErrorComponent, ControlErrorsComponent, ResourceErrorsComponent, ErrorsComponent,
		RouterModule, CommonAuthModule],
	providers: [
		AppResourceResolve,
		AppSnackBarService,
		AppErrorRoutingService,
		AppLoadingService,
		AppLanguageService
	],
})
export class AppCommonModule {

}
