import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Store} from '@ngrx/store';
import '../rxjs-operators';
import {PresentationMetaService} from '@adnovum/asap-resource-browser-module';

/**
 * Loads meta data necessary to display the screens with embedded ARB components. The meta-resource is necessary to construct the
 * component configuration.
 */
@Injectable()
export class EmbeddedMetaResolver implements Resolve<any> {

	constructor(private store: Store<any>, private metaLoader: PresentationMetaService) {
	}

	resolve(route: ActivatedRouteSnapshot) {
		const resourceType = route.data['resourceType'];
		return this.metaLoader.loadMetaResources({
			resourceType: resourceType
		}).toPromise();
	}
}


