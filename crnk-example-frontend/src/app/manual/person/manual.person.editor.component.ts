import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import '../../rxjs-operators';
import {Subscription} from 'rxjs/Subscription';
import {BeanBinding} from '@crnk/angular-ngrx/expression';
import {FormBinding} from '@crnk/angular-ngrx/binding';
import {QPerson} from 'resources';
import {CrnkBindingService} from '@crnk/angular-ngrx';

@Component({
	selector: 'demo-person-editor',
	templateUrl: 'manual.person.editor.component.html',
})
export class PersonEditorComponent implements OnInit, OnDestroy {

	@ViewChild('formRef') form;

	public binding: FormBinding;

	public person: QPerson;

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
			person => {
				this.person = new QPerson(new BeanBinding(person), null);

			}
		);
		// this.person$ =  this.binding.resource$.map(resource => new QPersonEntity(new BeanBinding(resource), null));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
