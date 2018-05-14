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
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { LanguageCode } from '../language/common.language';
import { Store } from '@ngrx/store';
import { getAppState$ } from '../../store';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

	private currentLanguage: LanguageCode;

	constructor(store: Store<any>) {
		store.let(getAppState$())
			.filter(state => state != null)
			.subscribe(state => this.currentLanguage = state.language);
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log('CustomHttpInterceptor#intercept()');
		// clone the request to add custom headers
		const updatedReq = req.clone({ headers: this.addCustomHeaders(req.headers)});

		// send the newly created request
		return next.handle(updatedReq)
			.do((ev: HttpEvent<any>) => {
				if (ev instanceof HttpResponse) {
					// do sth with the response
				}
			})
			.catch(response => {
				if (response instanceof HttpErrorResponse) {
					console.log('CustomHttpInterceptor#intercept() - processing http error', response);
				}
				return Observable.throw(response);
			});
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


