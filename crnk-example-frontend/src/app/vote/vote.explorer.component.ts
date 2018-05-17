import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrnkBindingService, DataTableBinding } from '@crnk/angular-ngrx';
import { VoteListResult } from 'resources/index';
import { Store } from '@ngrx/store';
import '../rxjs-operators';

@Component({
	selector: 'demo-vote-explorer',
	templateUrl: 'vote.explorer.component.html',
})
export class VoteExplorerComponent implements OnInit, OnDestroy {

	binding: DataTableBinding;

	private subscription: Subscription;

	public votes: VoteListResult;

	constructor(
		private route: ActivatedRoute,
		private bindingService: CrnkBindingService,
		private store: Store<any>
	) {
	}

	ngOnInit() {
		const queryId = this.route.snapshot.data['queryId'];
		this.binding = this.bindingService.bindDataTable({ queryId: queryId });
		this.subscription = this.binding.result$.subscribe(it => this.votes = it as VoteListResult);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
