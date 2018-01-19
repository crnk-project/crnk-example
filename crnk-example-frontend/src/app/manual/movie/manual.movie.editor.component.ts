import {Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import '../../rxjs-operators';
import {Subscription} from 'rxjs/Subscription';
import {BeanBinding} from '@crnk/angular-ngrx/expression';
import {FormBinding, CrnkBindingService} from '@crnk/angular-ngrx/binding';
import {QMovie} from 'resources';

@Component({
	selector: 'demo-movie-editor',
	templateUrl: 'manual.movie.editor.component.html',
})
export class MovieEditorComponent implements OnInit, OnDestroy {

	@ViewChild('formRef') form;

	public binding: FormBinding;

	public movie: QMovie;

	private subscription: Subscription;

	constructor(
		public route: ActivatedRoute,
		private bindingService: CrnkBindingService
	) {
	}

	ngOnInit() {
		const queryId = this.route.snapshot.data['queryId'];
		this.binding = this.bindingService.bindForm({
			form: this.form,
			queryId: queryId
		});

		// note that one could use the "async" pipe and "as" operator, but so far code completion
		// does not seem to work in Intellij. For this reason the example sticks to slightly more verbose subscriptions.
		this.subscription = this.binding.resource$.subscribe(
			movie => {
				this.movie = new QMovie(new BeanBinding(movie), null);

			}
		);
		// this.movie$ =  this.binding.resource$.map(resource => new QMovieEntity(new BeanBinding(resource), null));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
