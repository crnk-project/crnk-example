import {Params, RouterStateSnapshot} from '@angular/router';
import {RouterStateSerializer} from '@ngrx/router-store';

export interface AsapRouterState {
	url: string;
	//queryParams: Params;
}

/**
 * Prevents performance issues when the Store Devtools is used, because RouterStateSnapshot is a large structure.
 * See https://github.com/ngrx/platform/blob/master/docs/router-store/api.md#custom-router-state-serializer
 */
export class AsapRouterStateSerializer implements RouterStateSerializer<AsapRouterState> {
	serialize(routerState: RouterStateSnapshot): AsapRouterState {
		const {url} = routerState;
		//const queryParams = routerState.root.queryParams;

		return {url};
	}
}
