import {throwError as observableThrowError,  Observable } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpHeaders,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import { LanguageCode } from '../language/common.language';
import { Store } from '@ngrx/store';
import { getAppState$ } from '../../store';


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

	private currentLanguage: LanguageCode;

	constructor(store: Store<any>) {
		store.pipe((getAppState$()))
			.subscribe(state => this.currentLanguage = state.language);
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log('CustomHttpInterceptor#intercept()');
		// clone the request to add custom headers
		const updatedReq = req.clone({ headers: this.addCustomHeaders(req.headers)});

		// send the newly created request
		return next.handle(updatedReq).pipe(
			tap((ev: HttpEvent<any>) => {
				if (ev instanceof HttpResponse) {
					// do sth with the response
				}
			}),
			catchError(response => {
				if (response instanceof HttpErrorResponse) {
					console.log('CustomHttpInterceptor#intercept() - processing http error', response);
				}
				return observableThrowError(response);
			}));
	}

	private addCustomHeaders(headers: HttpHeaders): HttpHeaders {
		console.log('CustomHttpInterceptor#addCustomHeaders()');
		headers = headers.set('Content-Type', 'application/json');
		if (this.currentLanguage) {
			headers = headers.set('Accept-Language', this.currentLanguage);
		}

		return headers;
	}
}


