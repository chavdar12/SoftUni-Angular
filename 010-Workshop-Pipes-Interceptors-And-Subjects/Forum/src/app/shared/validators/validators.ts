import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// At least 6 symbols before "@", domain "gmail", top level domain "bg" or "com".
export const GMAIL_PATTERN = /^[A-Za-z0-9._-]{6,}@gmail\.(bg|com)$/;

export const gmailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  !control.value || GMAIL_PATTERN.test(control.value) ? null : { gmail: true };

// Group validator - both controls of the group must hold the same value.
export function matchValidator(first: string, second: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null =>
    group.get(first)?.value === group.get(second)?.value ? null : { mismatch: true };
}
