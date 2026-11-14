import { Directive, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

// Adds the skeleton's `input-error` class to a touched, invalid control.
// Works with both reactive (formControlName) and template-driven (ngModel) inputs.
@Directive({
  selector: '[appInputError]',
  host: { '[class.input-error]': 'showError' },
})
export class InputErrorDirective {
  private readonly control = inject(NgControl, { self: true });

  get showError(): boolean {
    return !!this.control.touched && !!this.control.invalid;
  }
}
