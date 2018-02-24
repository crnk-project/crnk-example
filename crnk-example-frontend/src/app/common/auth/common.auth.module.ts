import { AUTH_SERVICE, AuthModule, PROTECTED_FALLBACK_PAGE_URI, PUBLIC_FALLBACK_PAGE_URI } from 'ngx-auth';
import { AuthenticationService } from './common.auth.service';
import { NgModule } from '@angular/core';


@NgModule({
	imports: [
		AuthModule,
		// OAuthModule.forRoot()
	],
	providers: [
		{ provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/' },
		{ provide: PUBLIC_FALLBACK_PAGE_URI, useValue: 'http://localhost:8080/login/github' },
		{ provide: AUTH_SERVICE, useClass: AuthenticationService }
	]
})
export class CommonAuthModule {

}