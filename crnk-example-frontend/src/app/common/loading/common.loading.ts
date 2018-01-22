import { Injectable, NgModule } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import {
	NgrxJsonApiService, NgrxJsonApiStore, NgrxJsonApiModule, getNgrxJsonApiStore, NgrxJsonApiState,
	NgrxJsonApiZone
} from 'ngrx-json-api';

import '../../rxjs-operators';

// TODO move into ngrx store

@Injectable()
export class AppLoadingService {

	private loadingState = new Subject<boolean>();
	private isRouting = false;
	private isJsonApiModifying = false;

	private _state: Observable<boolean>;

	constructor(private store: Store<any>, router: Router, ngrxJsonApiService: NgrxJsonApiService) {
		this.loadingState.next(false);

		// detect long routing => loading
		router.events.forEach((event) => {
			if (event instanceof NavigationStart) {
				this.isRouting = true;
			}
			else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
				this.isRouting = false;
			}
			this.updateLoadingState();
		});

		// detect JSON API modification
		// note that not GET operations are tracked, either this happens during navigation or the component is responsible
		// for displaying a loading indictor
		this.store.select('NgrxJsonApi').subscribe((jsonapiState: NgrxJsonApiState) => {
			const zoneIds = _.keys(jsonapiState.zones)
			const isBusy = (zone: NgrxJsonApiZone) => zone.isApplying > 0 || zone.isCreating > 0 || zone.isDeleting > 0 ||
				zone.isUpdating > 0;
			this.isJsonApiModifying = zoneIds.find(zoneId => isBusy(jsonapiState.zones[zoneId])) != null;
		});


		// we wait 300ms before switching to the loading state, but we immediately switch back
		this._state = this.loadingState.asObservable().distinctUntilChanged().debounce(it => Observable.timer(it ? 300 : 0)));
	}

	private updateLoadingState() {
		this.loadingState.next(this.isRouting || this.isJsonApiModifying);
	}

	public get state(): Observable<boolean> {
		return this._state;
	}
}


@NgModule({
	imports: [
		NgrxJsonApiModule
	],
	providers: [AppLoadingService]
})
export class ArbLoadingModule {

}
