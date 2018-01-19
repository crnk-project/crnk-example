import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {DataTableBinding, CrnkBindingService} from '@crnk/angular-ngrx';
import {Person, PersonListResult} from 'resources';
import {Store} from '@ngrx/store';
import '../../rxjs-operators';
import {Go} from '@adnovum/asap-resource-browser-module';

@Component({
	selector: 'demo-person-explorer',
	templateUrl: 'manual.person.explorer.component.html',
})
export class PersonExplorerComponent implements OnInit, OnDestroy {

	binding: DataTableBinding;

	private subscription: Subscription;

	public result: PersonListResult;

	constructor(
		private route: ActivatedRoute,
		private bindingService: CrnkBindingService,
		private store: Store<any>
	) {
	}

	ngOnInit() {
		const queryId = this.route.snapshot.data['queryId'];
		this.binding = this.bindingService.bindDataTable({queryId: queryId});
		this.subscription = this.binding.result$.subscribe(it => this.result = it as PersonListResult);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	open(person: Person) {
		this.store.dispatch(new Go({path: [`/manual/manualPerson/${person.id}`]}));
	}

	create() {
		this.store.dispatch(new Go({path: [`/manual/manualPerson/create`]}));
	}

}
