import {NgModule} from '@angular/core';
import {ARB_PAGE_MENU_MODEL} from '@adnovum/asap-resource-browser-module';

// tag::menu[]
const APP_MENU_MODEL = [
	// end::menu[]
	{label: 'Dashboard', icon: 'dashboard', routerLink: ['/']},

	{
		label: 'Dynamic', icon: 'brush',
		items: [
			{
				label: 'Reference Data', icon: 'brush',
				items: [
					{label: 'Languages', icon: 'brush', routerLink: ['/languageCode']},
					{label: 'Countries', icon: 'brush', routerLink: ['/countryCode']},
					{label: 'Mime Types', icon: 'brush', routerLink: ['/mimeTypeCode']},
					{label: 'Genres', icon: 'brush', routerLink: ['/movieGenreCode']},
				]
			},

			// tag::menu[]
			{label: 'Persons', icon: 'dashboard', routerLink: ['/person']},
			{label: 'Movies', icon: 'dashboard', routerLink: ['/movie']},
			{label: 'Votes', icon: 'dashboard', routerLink: ['/vote']},
		]
	},

	{
		label: 'System', icon: 'brush',
		items: [
			{label: 'Configuration', icon: 'dashboard', routerLink: ['/configuration/']},
			{
				label: 'Monitor', icon: 'brush',
				items: [
					{label: 'Metrics', icon: 'brush', routerLink: ['/monitor/metric/gauge']},
					{label: 'Health', icon: 'brush', routerLink: ['/monitor/health']},
				]
			},
			{
				label: 'Audit', icon: 'brush',
				items: [
					{label: 'Changes', icon: 'brush', routerLink: ['/auditedChange']},
					{label: 'Sessions', icon: 'brush', routerLink: ['/auditedSession']},
				]
			},
			{
				label: 'Browser', icon: 'brush',
				items: [
					{label: 'Layout', icon: 'dashboard', routerLink: ['/system/layout']},
					{label: 'Debug', icon: 'dashboard', routerLink: ['/system/debug']}
				]
			},

			{
				label: 'Data Universe', icon: 'brush',
				items: [
					{label: 'Resources', icon: 'dashboard', routerLink: ['/meta/resource']},
					// {label: 'Entities', icon: 'dashboard', routerLink: ['/meta/entity']},
					{label: 'Attributes', icon: 'dashboard', routerLink: ['/meta/attribute']},
				]
			},
		]
	},
	{
		label: 'Manual', icon: 'brush',
		items: [
			{label: 'Persons', icon: 'brush', routerLink: ['/manual/manualPerson']},
			{label: 'Movies', icon: 'brush', routerLink: ['/manual/manualMovie']},
		]
	},
	{
		label: 'Embedded', icon: 'brush',
		items: [
			{label: 'Movies', icon: 'brush', routerLink: ['/embedded/movie']},
		]
	}
];

export function createPageMenuModelFactory() {
	return APP_MENU_MODEL;
}

@NgModule({
	providers: [
		{
			useFactory: createPageMenuModelFactory,
			provide: ARB_PAGE_MENU_MODEL
		}
	],
})
export class AppMenuModule {

}

// end::menu[]
