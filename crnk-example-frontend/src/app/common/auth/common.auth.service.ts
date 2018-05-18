import {of as observableOf,  Observable } from 'rxjs';
import { AuthService, PUBLIC_FALLBACK_PAGE_URI } from 'ngx-auth';
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
// currently makes use of a session token provided by spring and a login page it is redirected to for authentication
// TODO consider moving example from session to token based approach
export class AuthenticationService implements AuthService {

	constructor(private http: HttpClient, private injector: Injector) {}

	public isAuthorized(): Observable<boolean> {
		return observableOf(true);
	}

	public getAccessToken(): Observable<string> {
		return observableOf('NOT_A_TOKEN');
	}

	public refreshToken(): Observable<any> {
		const url = this.injector.get(PUBLIC_FALLBACK_PAGE_URI).toString();
		console.log('refreshToken', url);
		window.location.href = url;
		return observableOf('NOT_A_TOKEN');
	}

	public refreshShouldHappen(response: HttpErrorResponse): boolean {
		console.log('refreshShouldHappen', response);
		return response.status === 401;
	}

	public verifyTokenRequest(url: string): boolean {
		return false;
	}
}
