import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CrnkBindingService, DataTableBinding } from '@crnk/angular-ngrx';
import { Person, PersonListResult } from 'resources/index';
import { Store } from '@ngrx/store';
import '../rxjs-operators';
import { OpenResourceAction } from '../store';

@Component({
	selector: 'demo-person-explorer',
	templateUrl: 'person.explorer.component.html',
})
export class PersonExplorerComponent implements OnInit, OnDestroy {

	binding: DataTableBinding;

	private subscription: Subscription;

	public persons: PersonListResult;

	constructor(
		private route: ActivatedRoute,
		private bindingService: CrnkBindingService,
		private store: Store<any>
	) {
	}

	ngOnInit() {
		const queryId = this.route.snapshot.data['queryId'];
		this.binding = this.bindingService.bindDataTable({ queryId: queryId });
		this.subscription = this.binding.result$.subscribe(it => this.persons = it as PersonListResult);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	open(person: Person) {
		this.store.dispatch(new OpenResourceAction('person', person.id));
	}

	create() {
		this.store.dispatch(new OpenResourceAction('person', null, true));
	}

}
