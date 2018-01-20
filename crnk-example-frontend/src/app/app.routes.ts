import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './common/error';

// tag::routes[]
export const ROUTES: Routes = [
	{ path: '', component: HomeComponent },
	{ path: '**', component: NoContentComponent },
];
// tag::routes[]

