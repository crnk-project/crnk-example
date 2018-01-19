import {NgModule} from '@angular/core';
import {ARB_PAGE_BRANDING, Branding} from '@adnovum/asap-resource-browser-module';

export function createPageBrandingFactory(): Branding {
	return {
		name: 'ASAP Demo'
	};
}

@NgModule({
	providers: [
		{
			useFactory: createPageBrandingFactory,
			provide: ARB_PAGE_BRANDING
		}
	],
})
export class AppBrandingModule {


}
