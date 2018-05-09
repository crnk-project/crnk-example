import { Injectable } from '@angular/core';
import { NgrxJsonApiService, } from 'ngrx-json-api';

import '../../rxjs-operators';
import { assumeNoError, waitWhileLoading } from '@crnk/angular-ngrx';

@Injectable()
export class LoginService {

	public data: any;

	constructor(private jsonapi: NgrxJsonApiService) {
	}

	public retrieveDetails(): Promise<any> {
		this.jsonapi.putQuery({
			query: {
				type: 'login',
				queryId: 'loginQueryId'
			}
		});

		return this.jsonapi.selectManyResults('loginQueryId')
			.let(waitWhileLoading())
			.let(assumeNoError())
			.do(result => {
				this.data = result.data;
			})
			.take(1)
			.toPromise();
	}
}
