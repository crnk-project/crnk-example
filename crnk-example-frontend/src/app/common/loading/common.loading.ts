import {Injectable, NgModule} from '@angular/core';
import {Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Store} from '@ngrx/store';
import {NgrxJsonApiService, NgrxJsonApiStore, NgrxJsonApiModule} from 'ngrx-json-api';

import '../../rxjs-operators';

// TODO move into ngrx store

@Injectable()
export class LoadingService {

	private loadingState = new Subject<boolean>();
	private isRouting = false;
	private isJsonApiModifying = false;

	constructor(private store: Store<any>, router: Router, ngrxJsonApiService: NgrxJsonApiService) {
		this.loadingState.next(false);

		router.events.forEach((event) => {
			if (event instanceof NavigationStart) {
				this.isRouting = true;
			}
			else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
				this.isRouting = false;
			}
			this.updateLoadingState();
		});

		// TODO
		/*
		this.store.select('NgrxJsonApi').select('api').map(it => it as NgrxJsonApiStore).subscribe(
			state => {
				// note that we do not switch to a global loading state for reads as some widgets
				// like tables handle loading indicators locally (=> table sorting/filtering)
				this.isJsonApiModifying =
					state.isApplying > 0 || state.isCreating > 0 || state.isDeleting > 0 || state.isUpdating > 0;
				this.updateLoadingState();
			}
		);
		*/
	}

	private updateLoadingState() {
		this.loadingState.next(this.isRouting || this.isJsonApiModifying);
	}

	public selectLoadingState(): Observable<boolean> {
		// we wait 500ms before switching to the loading state, but we immediately switch back
		return this.loadingState.asObservable().distinctUntilChanged().debounce(it => Observable.timer(it ? 500 : 0));
	}
}


@NgModule({
	imports: [
		NgrxJsonApiModule
	],
	providers: [LoadingService]
})
export class ArbLoadingModule {

}
