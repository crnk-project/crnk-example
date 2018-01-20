import { RouterModule, Routes } from '@angular/router';
import '../rxjs-operators';
import { NgModule } from '@angular/core';
import { ResourceResolve } from './common.resource.resolver';
import { FormsModule } from '@angular/forms';
import { CrnkBindingModule } from '@crnk/angular-ngrx';
import { MessagesModule } from 'primeng/components/messages/messages';
import {
	ControlErrorsComponent, ErrorComponent, ErrorsComponent, InternalErrorComponent, NoContentComponent,
	NotAuthorizedComponent, ResourceErrorsComponent
} from './error/';
import { CommonModule } from '@angular/common';

export const ERROR_ROUTES: Routes = [
	{ path: 'error/forbidden', component: NotAuthorizedComponent },
	{ path: 'error/notfound', component: NoContentComponent },
	{ path: 'error/internal', component: InternalErrorComponent }
];

@NgModule({

	imports: [CommonModule, MessagesModule,

		CrnkBindingModule, FormsModule,
		RouterModule.forChild(ERROR_ROUTES)],
	declarations: [
		NoContentComponent, NotAuthorizedComponent, InternalErrorComponent,
		ErrorComponent, ControlErrorsComponent, ResourceErrorsComponent, ErrorsComponent
	],
	exports: [NoContentComponent, NotAuthorizedComponent, InternalErrorComponent,
		ErrorComponent, ControlErrorsComponent, ResourceErrorsComponent, ErrorsComponent,
		RouterModule],
	providers: [ResourceResolve],
})
export class ManualModule {

}
