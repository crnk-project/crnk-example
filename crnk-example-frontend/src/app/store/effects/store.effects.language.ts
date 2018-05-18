import {filter, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import '../../rxjs-operators';
import { AppActionTypes, SetLanguageAction } from '../store.actions';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class AppLanguageEffects {


	@Effect() updateLanguage;

	constructor(actions: Actions, translate: TranslateService) {

		this.updateLanguage = actions
			.ofType(AppActionTypes.SET_LANGUAGE).pipe(
			map((action: SetLanguageAction) => {
				localStorage.setItem('language', action.language);
				translate.use(action.language);
			}),
			filter(() => false)); // not returning any action

	}
}
