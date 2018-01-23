import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Path } from '@crnk/angular-ngrx';
import * as _ from 'lodash';

@Component({
	selector: 'demo-control-errors',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<crnk-control-errors [expression]="expression">
			<ng-template let-errorData="errorData">
				<demo-error [error]="errorData"></demo-error>
			</ng-template>
		</crnk-control-errors>
	`,
})
export class ControlErrorsComponent {

	@Input()
	public expression: Path<any>;

}


/**
 * Displays the errors of a resource.
 */
@Component({
	selector: 'demo-resource-errors',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<crnk-resource-errors [expression]="expression">
			<ng-template let-errorData="errorData">
				<demo-error [error]="errorData"></demo-error>
			</ng-template>
		</crnk-resource-errors>
	`,
})
export class ResourceErrorsComponent {

	@Input()
	public expression: Path<any>;
}


/**
 * Displays a single error of various type:
 *
 * <ul>
 *     <li>simple strings</li>
 *     <li>JSON API errors</li>
 *     <li>anything resembling a json api error (having a code, title, detail or id)</li>
 * </ul>
 *
 * In this application we make use of <mat-errors> to integrate within the form field. From this it will get proper formatting
 * and coloring.
 */
@Component({
	selector: 'demo-error',
	template: `
		{{message | translate}}
	`,
})
export class ErrorComponent {

	@Input() error: any;

	get message() {
		if (!this.error) {
			return undefined;
		}

		if (this.error.status === '409') {
			return 'error.conflict';
		}

		if (this.error.code || this.error.id || this.error.detail || this.error.title) {
			if (this.error.detail) {
				return this.error.detail;
			}
			if (this.error.title) {
				return this.error.title;
			}
			if (this.error.code) {
				return this.error.code;
			}
			if (this.error.id) {
				return this.error.id;
			}
		}
		return this.error;
	}
}

/**
 * Displays a set of errors with {@link ErrorComponent}
 */
@Component({
	selector: 'demo-errors',
	template: `
		<div *ngFor="let error of elements">
			<demo-error [error]="error"></demo-error>
		</div>
	`,

})
export class ErrorsComponent {

	@Input() errors: any;

	public get elements(): Array<any> {
		if (!this.errors) {
			return [];
		}
		else if (_.isArray(this.errors)) {
			return this.errors;
		}
		else {
			return _.toPairs(this.errors).map(it => it[1]);
		}
	}
}
