import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CrnkBindingService, DataTableBinding} from '@crnk/angular-ngrx';
import {Movie, MovieListResult} from 'resources';
import {Store} from '@ngrx/store';
import '../../rxjs-operators';
import {Go} from '@adnovum/asap-resource-browser-module';

@Component({
	selector: 'demo-movie-explorer',
	templateUrl: 'manual.movie.explorer.component.html',
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
		this.binding = this.bindingService.bindDataTable({queryId: queryId});
		this.subscription = this.binding.result$.subscribe(it => this.movies = it as MovieListResult);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	open(movie: Movie) {
		this.store.dispatch(new Go({path: [`/manual/manualMovie/${movie.id}`]}));
	}

	create() {
		this.store.dispatch(new Go({path: [`/manual/manualMovie/create`]}));
	}

}
