import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';
import '../../rxjs-operators';
import { AppActionTypes, SetLanguageAction } from '../store.actions';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class AppLanguageEffects {


	@Effect() updateLanguage;

	constructor(actions: Actions, translate: TranslateService) {

		this.updateLanguage = actions
			.ofType(AppActionTypes.SET_LANGUAGE)
			.map((action: SetLanguageAction) => {
				localStorage.setItem('language', action.language);
				translate.use(action.language);
			})
			.filter(() => false); // not returning any action

	}
}
