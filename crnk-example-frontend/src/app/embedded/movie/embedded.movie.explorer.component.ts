import {Component, OnInit} from '@angular/core';
import {CrnkBindingService, DataTableBinding} from '@crnk/angular-ngrx';

import {DataTableModel, PresentationElementFactoryService} from '@adnovum/asap-resource-browser-module';
import '../../rxjs-operators';
import {NgrxJsonApiService, Query} from 'ngrx-json-api';

/**
 * Embeds a meta-driven DataTableComponent from ARB. Meta resource is loaded by EmbeddedMetaResolver.
 */
@Component({
	selector: 'demo-embedded-movie-explorer',
	templateUrl: 'embedded.movie.explorer.component.html',
})
export class EmbeddedMovieExplorerComponent implements OnInit {

	public binding: DataTableBinding;

	public tableConfig: DataTableModel;

	constructor(
		private bindingService: CrnkBindingService,
		private jsonapi: NgrxJsonApiService,
		private presentationElementFactory: PresentationElementFactoryService
	) {
	}

	ngOnInit() {
		const presentationEnv = this.presentationElementFactory.resolveEnvironment({
			metaTypeRef: 'resources.movie',
			acceptedTypes: ['TABLE']
		});

		this.tableConfig = this.presentationElementFactory.createElement(presentationEnv) as DataTableModel;

		const initialQuery: Query = {
			type: 'movie',
			queryId: 'embedded/movies'
		};
		this.jsonapi.putQuery({query: initialQuery});
		this.binding = this.bindingService.bindDataTable({queryId: initialQuery.queryId});
	}

	onLazyLoad(event) {
		this.binding.onLazyLoad(event);
	}
}
