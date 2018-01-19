import {NgModule} from '@angular/core';
import {ARB_PRESENTATION_LAYOUT_DEFAULT_DATA_FACTORY} from '@adnovum/asap-resource-browser-module';

export const DATA_UNIVERSE_LAYOUT = {
	'version': 1,
	'elements':
		[
			{
				'matcher': {
					'id': 'meta/resource'
				},

				'data': {
					'table': {
						'columns': {
							'order': [
								'attributes.resourceType',
								'attributes.name',
								'relationships.superType.data',
								'attributes.insertable',
								'attributes.updatable',
								'attributes.deletable',
								'attributes.readable'
							]
						}
					}
				}
			},

			{
				'matcher': {
					'id': 'meta/attribute'
				},

				'data': {
					'table': {
						'columns': {
							'order': [
								'relationships.parent.data',
								'attributes.name',
								'relationships.type.data',
								'attributes.association',
								'attributes.updatable',
								'attributes.insertable',
								'attributes.cascaded',
								'attributes.nullable',
								'attributes.sortable',
								'attributes.filterable',
								'attributes.lazy',
								'attributes.primaryKeyAttribute',
								'attributes.version'
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
export class ArbDataUniverseModule {
}

