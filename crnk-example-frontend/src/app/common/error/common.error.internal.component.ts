import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
	selector: 'demo-no-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="exception-body error-page">
			<div class="exception-type">
				<img src="assets/images/error.svg">
			</div>

			<div class="card exception-panel">
				<i class="material-icons">&#xE000;</i>
				<h1>Exception Occured</h1>
				<div class="exception-detail">Please contact system administrator</div>
				<a href="/" class="ui-button secondary">
					<span class="ui-button-text">Homepage</span>
				</a>
			</div>
		</div>

	`
})
export class InternalErrorComponent {

}
