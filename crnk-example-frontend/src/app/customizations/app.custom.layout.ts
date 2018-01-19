import {NgModule} from '@angular/core';
import {
	ARB_PRESENTATION_LAYOUT_CONFIG_FACTORY,
	ARB_PRESENTATION_LAYOUT_DEFAULT_DATA_FACTORY
} from '@adnovum/asap-resource-browser-module';

// tag::layout[]
export const APP_DEFAULT_LAYOUT = {
	'version': 1,
	'elements': [
		{
			'matcher': {
				'id': 'configuration'
			},
			'data': {
				'table': {
					'columns': {
						'order': ['id', 'attributes.value']
					}
				}
			}
		},
		// end::layout[]

		{
			'matcher': {
				'id': 'movie/*'
			},
			'data': {
				'form': {
					'elements': {
						/*"order": [
							"id",
							"title",
							"year",
							"runtime",
							"released",
							"plot",
							"fullPlot",
							"closingCredits",
							"auditInfo.ctlModUid",
							"auditInfo.ctlModTs",
							"auditInfo.ctlCreUid",
							"auditInfo.ctlCreTs",
							"genres",
							"directors",
							"writers",
							"actors",
							"poster",
							"rating",
							"rottenTomatoes",
							"awards",
							"countries",
							"languages",
							"imdb.id",
							"imdb.rating",
							"imdb.votes"
						],*/
						map: {
							actors: {
								component: {
									columns: {
										order: ['relationships.person.data', 'attributes.name'],
										map: {
											'attributes.name': {width: '100px'},
											'relationships.person.data': {width: '100px'}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	]
	// tag::layout[]
};
// end::layout[]

// tag::config[]
export const APP_LAYOUT_CONFIG = [
	{
		id: 'explorer.table.columnOrder',
		strategy: 'default',
		path: ['table', 'columns', 'order']
	}, {
		id: 'explorer.table.columnWidth',
		strategy: 'default',
		path: ['table', 'columns', 'map', '*', 'width']
	}, {
		id: 'editor.form.elementOrder',
		strategy: 'order',
		path: ['form', 'elements', 'order']
	}, {
		id: 'editor.form.selector.elementOrder',
		strategy: 'default',
		path: ['form', 'elements', 'map', '*', 'component', 'selector', 'selectDialog', 'table', 'columns', 'order']
	}, {
		id: 'editor.form.element.table.columnOrder',
		strategy: 'order',
		path: ['form', 'elements', 'map', '*', 'component', 'columns', 'order']
	}, {
		id: 'editor.form.element.table.columnWidth',
		strategy: 'default',
		path: ['form', 'elements', 'map', '*', 'component', 'columns', 'map', '*', 'width']
	}
];
// end::config[]

// tag::module[]
@NgModule({
	providers: [
		{
			useValue: APP_LAYOUT_CONFIG,
			provide: ARB_PRESENTATION_LAYOUT_CONFIG_FACTORY,
			multi: true,
		},
		{
			useValue: APP_DEFAULT_LAYOUT,
			provide: ARB_PRESENTATION_LAYOUT_DEFAULT_DATA_FACTORY,
			multi: true
		}
	],
})
export class AppLayoutModule {
}

// end::module[]
