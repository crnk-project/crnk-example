import {switchMap, filter, tap, map, first} from 'rxjs/operators';
import { Injectable } from '@angular/core';
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

		store.select(getAppState).pipe(
			map(state => state.notifications['editor']),
			tap(dismissSnackBar),
			filter(messageKey => messageKey != null),
			switchMap(messageKey => translate.get(messageKey)),
			first())
			.subscribe(showSnackBar);
	}
}
