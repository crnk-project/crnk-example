import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppState, initAppState } from './store.model';
import { Observable } from 'rxjs/Observable';
import { AppNotificationEffects } from './effects/store.effects.notification';
import { AppNavigationEffects } from './effects/store.effects.navigation';
import { appReducer } from './store.reducers';
import { AppLanguageEffects } from './effects/store.effects.language';


export function getAppState$() {
	return (state$: Store<any>): Observable<AppState> => {
		return state$
			.select('app')
			.filter(state => state != null);
		//.map(it => it['presentation'] as PresentationState);
	};
};

export function getAppState(state: any): AppState {
	const arbState = state['app'];
	if (!arbState) {
		throw new Error('AppStoreModule not yet initialized');
	}
	return arbState; //arbState['presentation'] as PresentationState;
};

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		EffectsModule.forFeature([
			AppNavigationEffects, AppNotificationEffects, AppLanguageEffects
		]),
		StoreModule.forFeature('app', appReducer, {
			initialState: initAppState
		}),
	],
	providers: [],
	declarations: []
})
export class AppStoreModule {

}



