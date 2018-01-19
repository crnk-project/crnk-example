import {RouterModule, Routes} from '@angular/router';
import '../rxjs-operators';
import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {EmbeddedMovieExplorerComponent} from './movie/embedded.movie.explorer.component';
import {EmbeddedMetaResolver} from './embedded.meta.resolver';
import {ArbpDataTableComponentModule} from '@adnovum/asap-resource-browser-module';
import {ButtonModule} from 'primeng/components/button/button';
import {MultiSelectModule} from 'primeng/primeng';

export const EMBEDDED_ROUTES: Routes = [
	{
		path: 'embedded/movie', component: EmbeddedMovieExplorerComponent,
		data: {
			resourceType: 'movie'
		},
		resolve: {
			queryId: EmbeddedMetaResolver
		}
	}
];


@NgModule({
	declarations: [
		EmbeddedMovieExplorerComponent
	],
	providers: [EmbeddedMetaResolver],
	imports: [
		ArbpDataTableComponentModule, TranslateModule, ButtonModule,
		RouterModule.forChild(EMBEDDED_ROUTES),
		MultiSelectModule
	],
	exports: [
		MultiSelectModule
	]
})
export class EmbeddedModule {

}




