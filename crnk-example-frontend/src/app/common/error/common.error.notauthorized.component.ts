import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
	selector: 'demo-not-authorized',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="exception-body accessdenied-page">
			<div class="exception-type">
				<img src="assets/images/401.svg">
			</div>

			<div class="card exception-panel">
				<i class="material-icons">&#xE32A;</i>
				<h1>Access Denied</h1>
				<div class="exception-detail">You are not authorized to access this resource.</div>
				<a mat-button href="/">Return to Homepage</a>
			</div>
		</div>
	`
})
export class NotAuthorizedComponent {

}
