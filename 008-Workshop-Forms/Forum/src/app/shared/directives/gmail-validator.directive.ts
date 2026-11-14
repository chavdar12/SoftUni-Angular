import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { gmailValidator } from '../validators/validators';

// Template-driven counterpart of `gmailValidator`: <input ngModel appGmail />
@Directive({
  selector: '[appGmail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: GmailValidatorDirective, multi: true }],
})
export class GmailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return gmailValidator(control);
  }
}
