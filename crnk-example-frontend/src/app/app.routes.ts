import {Routes} from '@angular/router';
import {NoContentComponent} from '@adnovum/asap-resource-browser-module';
import {ViewComponent, ViewResolve, VIEW_URL_MATCHER} from '@adnovum/asap-resource-browser-module';
import {HomeComponent} from './home';

// tag::routes[]
export const ROUTES: Routes = [
	{path: '', component: HomeComponent},
	{
		matcher: VIEW_URL_MATCHER,
		component: ViewComponent,
		resolve: {
			config: ViewResolve
		}
	},
	{path: '**', component: NoContentComponent},
];
// tag::routes[]

