import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrnkBindingService, DataTableBinding } from '@crnk/angular-ngrx';
import { Person, PersonListResult } from 'resources/index';
import { Store } from '@ngrx/store';
import '../rxjs-operators';
import { OpenResourceAction } from '../store';

@Component({
	selector: 'demo-secret-explorer',
	templateUrl: 'secret.explorer.component.html',
})
export class SecretExplorerComponent implements OnInit, OnDestroy {

	binding: DataTableBinding;

	private subscription: Subscription;

	public secrets: PersonListResult;

	constructor(
		private route: ActivatedRoute,
		private bindingService: CrnkBindingService,
		private store: Store<any>
	) {
	}

	ngOnInit() {
		const queryId = this.route.snapshot.data['queryId'];
		this.binding = this.bindingService.bindDataTable({ queryId: queryId });
		this.subscription = this.binding.result$.subscribe(it => this.secrets = it as PersonListResult);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	open(secret: Person) {
		this.store.dispatch(new OpenResourceAction('secret', secret.id));
	}

	create() {
		this.store.dispatch(new OpenResourceAction('secret', null, true));
	}

}
