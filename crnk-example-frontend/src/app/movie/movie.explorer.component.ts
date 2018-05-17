import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrnkBindingService, DataTableBinding } from '@crnk/angular-ngrx';
import { Movie, MovieListResult } from 'resources/index';
import { Store } from '@ngrx/store';
import '../rxjs-operators';
import { OpenResourceAction } from '../store';

@Component({
	selector: 'demo-movie-explorer',
	templateUrl: 'movie.explorer.component.html',
})
export class MovieExplorerComponent implements OnInit, OnDestroy {

	binding: DataTableBinding;

	private subscription: Subscription;

	public movies: MovieListResult;

	constructor(
		private route: ActivatedRoute,
		private bindingService: CrnkBindingService,
		private store: Store<any>
	) {
	}

	ngOnInit() {
		const queryId = this.route.snapshot.data['queryId'];
		this.binding = this.bindingService.bindDataTable({ queryId: queryId });
		this.subscription = this.binding.result$.subscribe(it => this.movies = it as MovieListResult);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	open(movie: Movie) {
		this.store.dispatch(new OpenResourceAction('movie', movie.id));
	}

	create() {
		this.store.dispatch(new OpenResourceAction('movie', null, true));
	}

}
