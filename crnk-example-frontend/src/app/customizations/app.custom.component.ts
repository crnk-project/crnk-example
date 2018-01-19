import {NgModule, Component, ChangeDetectorRef, ChangeDetectionStrategy, Input} from '@angular/core';
import {
	PresentationElementFactoryProvider,
	PresentationElementFactory,
	PRESENTATION_ACCEPT_BUILDER,
	ARB_PRESENTATION_BUILDER_FACTORY,
	PresentationEnvironment
} from '@adnovum/asap-resource-browser-module';
import {
	ComponentDefinition,
	ComponentDefinitionProvider,
	ARB_COMPONENT_DEFINITION_FACTORY
} from '@adnovum/asap-resource-browser-module';
import {OnPushValueAccessorBase} from '@adnovum/asap-resource-browser-module';
import {PresentationElementModel} from '@adnovum/asap-resource-browser-module';
import {FormsModule} from '@angular/forms';

// tag::resource[]
interface BoldTextModel extends PresentationElementModel {
	upperCase: boolean;
}

// end::resource[]

// tag::component[]
@Component({
	selector: 'demo-bold-text',
	template: `<span style="font-weight: bold">{{value != null && upperCase ? value.toUpperCase() : value}}</span>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoldTextComponent extends OnPushValueAccessorBase<any> {

	@Input() upperCase: boolean;

	constructor(cd: ChangeDetectorRef) {
		super(cd);
	}
}

// end::component[]

// tag::componentDef[]
export class AppComponentDefinitionProvider implements ComponentDefinitionProvider {

	public getComponentDefinitions(): Array<ComponentDefinition> {
		return [
			{
				id: 'display.boldText',
				componentType: BoldTextComponent,
				inputMapper: (component: BoldTextComponent, model: BoldTextModel) => {
					component.upperCase = model.upperCase;
				}
			}
		];
	}
}

// end::componentDef[]

// tag::presentationBuilder[]
export class AppPresentationBuilderProvider implements PresentationElementFactoryProvider {

	public getElementFactories(): Array<PresentationElementFactory> {
		return [
			{
				id: 'display.boldText',
				priority: 0,
				accept: PRESENTATION_ACCEPT_BUILDER.forDisplay().forResourceType('person').forAttributePath('name').build(),
				model: (componentEnv: PresentationEnvironment): BoldTextModel => {
					return {
						componentDefinitionId: 'display.boldText',
						upperCase: true
					};
				}
			}
		];
	}
}

// end::presentationBuilder[]

@NgModule({
	imports: [
		FormsModule
	],
	declarations: [
		BoldTextComponent
	],
	entryComponents: [
		BoldTextComponent
	],
	providers: [
		// tag::compProviderDI[]
		{
			useClass: AppComponentDefinitionProvider,
			provide: ARB_COMPONENT_DEFINITION_FACTORY,
			multi: true
		}
		// end::compProviderDI[]
		,
		// tag::presentationBuilderDI[]
		{
			useClass: AppPresentationBuilderProvider,
			provide: ARB_PRESENTATION_BUILDER_FACTORY,
			multi: true
		}
		// end::presentationBuilderDI[]
	]
	// end::providers[]
})
export class AppComponentModule {
}


