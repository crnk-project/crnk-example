import { Injectable } from '@angular/core';
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
import { Store } from '@ngrx/store';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { getAppState } from '../../store';
import { SimpleSnackBar } from '@angular/material/snack-bar/typings/simple-snack-bar';


@Injectable()
export class AppSnackBarService {

	private ref: MatSnackBarRef<SimpleSnackBar>;

	constructor(store: Store<any>, snackBar: MatSnackBar, translate: TranslateService) {

		const dismissSnackBar = () => {
			if (this.ref != null) {
				this.ref.dismiss();
				this.ref = null;
			}
		};

		const showSnackBar = (message) => {
			this.ref = snackBar.open(message);
		};

		store.select(getAppState)
			.map(state => state.notifications['editor'])
			.do(dismissSnackBar)
			.filter(messageKey => messageKey != null)
			.switchMap(messageKey => translate.get(messageKey).first())
			.subscribe(showSnackBar);
	}
}
