import { Component, input } from '@angular/core';

// The notification shown below each submit button.
@Component({
  selector: 'app-form-status',
  template: `
    @if (invalid() && touched()) {
      <p class="error">You can't continue until you provide a valid data!</p>
    }
  `,
  styles: `
    .error {
      color: red;
    }
  `,
})
export class FormStatus {
  readonly invalid = input.required<boolean>();
  readonly touched = input.required<boolean>();
}
