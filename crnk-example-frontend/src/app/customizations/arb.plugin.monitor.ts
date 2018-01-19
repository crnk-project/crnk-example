import {NgModule} from '@angular/core';
import {ARB_PRESENTATION_LAYOUT_DEFAULT_DATA_FACTORY} from '@adnovum/asap-resource-browser-module';

export const DATA_UNIVERSE_LAYOUT = {
	'version': 1,
	'elements':
		[
			{
				'matcher': {
					'id': 'monitor/metric/gauge'
				},

				'data': {
					'table': {
						'columns': {
							'order': [
								'id',
								'attributes.value',
								'attributes.snapshot.min',
								'attributes.snapshot.max'
							]
						}
					}
				}
			}

		]
};

@NgModule({
	providers: [
		{
			useValue: DATA_UNIVERSE_LAYOUT,
			provide: ARB_PRESENTATION_LAYOUT_DEFAULT_DATA_FACTORY,
			multi: true
		}
	],
})
export class ArbMonitorModule {
}

