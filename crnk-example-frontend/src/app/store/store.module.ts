import {ModuleWithProviders, NgModule, InjectionToken} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {ViewSelectors, ViewService} from './arb.presentation.store.service';
import {ActionReducerMap, Store, StoreModule} from '@ngrx/store';
import {ViewComponent} from './arb.presentation.component';
import {ViewResolve} from './arb.presentation.store.resolver';
import {CommonModule} from '@angular/common';
import {ArbComponentRegistryModule} from '../../component/registry/arb.component.registry';
import {FormsModule} from '@angular/forms';
import {ArbPresentationFactoryModule} from '../factory';
import {presentationReducer} from './store.reducers';
import {PresentationState} from './store.model';
import {Observable} from 'rxjs/Observable';
import {PresentationJsonApiEffects} from './effects/store.effects.jsonapi';
import {AppNotificationEffects} from './effects/store.effects.notification';
import {PresentationViewEffects} from './effects/store.effects.views';
import {PresentationNavigationEffects} from './effects/store.effects.navigation';
import {PresentationActionEffects} from './effects/store.effects.actions';

export interface PresentationStoreConfig {
	defaultRoutePathOffset?: number;
}


export function getPresentationState$() {
	return (state$: Store<any>): Observable<PresentationState> => {
		return state$
			.select('arbPresentation')
			.do(it => {
				if (!it) {
					throw new Error('PresentationStoreModule not initialized');
				}
			})
			.map(it => it['presentation'] as PresentationState);
	};
};

export function getPresentationState(state: any): PresentationState {
	const arbState = state['arbPresentation'];
	if (!arbState) {
		throw new Error('PresentationStoreModule not yet initialized');
	}
	return arbState['presentation'] as PresentationState;
};


export const ARB_PRESENTATION_STORE_CONFIG = new InjectionToken('ARB_PRESENTATION_STORE_CONFIG');

export function serviceFactory(store: Store<any>, config: PresentationStoreConfig, selectors: ViewSelectors) {
	return new ViewService(store, config, selectors);
};

export function viewResolveFactory(service: ViewService) {
	return new ViewResolve(service);
};

export function configurePresentationStoreModule(config: PresentationStoreConfig): Array<any> {
	return [
		ViewSelectors,
		{
			provide: ViewResolve,
			useFactory: viewResolveFactory,
			deps: [ViewService]
		},
		{
			provide: ViewService,
			useFactory: serviceFactory,
			deps: [Store, ARB_PRESENTATION_STORE_CONFIG, ViewSelectors]
		},
		/*{
		 provide: CanActivateView,
		 useFactory: canActivateViewFactory,
		 deps: [ViewService]
		 },*/
		{
			provide: ARB_PRESENTATION_STORE_CONFIG,
			useValue: config
		},
	];
};


export const presentationReducerMap: ActionReducerMap<any> = {
	presentation: presentationReducer
};


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		EffectsModule.forFeature([PresentationJsonApiEffects, PresentationActionEffects,
			PresentationNavigationEffects, AppNotificationEffects, PresentationViewEffects
		]),
		StoreModule.forFeature('arbPresentation', presentationReducerMap, {
			initialState: {}
		}),
		ArbComponentRegistryModule,
		// TODO move somewhere else and make independent
		ArbPresentationFactoryModule
	],
	declarations: [
		ViewComponent,
	]
})
export class ArbPresentationStoreModule {
	static configure(config: PresentationStoreConfig): ModuleWithProviders {
		return {
			ngModule: ArbPresentationStoreModule,
			providers: configurePresentationStoreModule(config)
		};
	}
}



