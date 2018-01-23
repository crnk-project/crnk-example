import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
	selector: 'demo-no-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="exception-body notfound-page">
			<div class="exception-type">
				<img src="assets/images/404.svg">
			</div>

			<div class="card exception-panel">
				<i class="material-icons">&#xE001;</i>
				<h1>Page Not Found</h1>
				<div class="exception-detail">The resource you are looking for does not exist.</div>
				<a mat-button href="/">Return to Homepage</a>
			</div>
		</div>
	`
})
export class NoContentComponent {

}
