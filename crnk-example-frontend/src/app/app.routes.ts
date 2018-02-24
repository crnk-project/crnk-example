import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './common/error';
import { PublicGuard } from 'ngx-auth';

// tag::routes[]
export const ROUTES: Routes = [
	{
		path: '',
		canActivate: [PublicGuard],
		component: HomeComponent
	},
	{
		path: '**',
		canActivate: [PublicGuard],
		component: NoContentComponent
	},
];
// tag::routes[]

