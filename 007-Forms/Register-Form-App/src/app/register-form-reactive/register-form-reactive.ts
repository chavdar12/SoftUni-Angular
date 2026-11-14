import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  BUILDING_TYPES,
  COUNTRY_CODES,
  FULL_NAME_PATTERN,
  IMAGE_URL_PATTERN,
  PASSWORD_PATTERN,
  PHONE_PATTERN,
} from '../shared/form-options';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  return group.get('password')?.value === group.get('rePassword')?.value
    ? null
    : { mismatch: true };
}

@Component({
  selector: 'app-register-form-reactive',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register-form-reactive.html',
  styleUrl: '../shared/form.css',
})
export class RegisterFormReactive {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly countryCodes = COUNTRY_CODES;
  protected readonly buildingTypes = BUILDING_TYPES;
  protected submitted: unknown = null;

  protected readonly form = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(FULL_NAME_PATTERN)]],
    email: ['', [Validators.required, Validators.email]],
    countryCode: [COUNTRY_CODES[0]],
    phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    buildingType: [BUILDING_TYPES[0]],
    imageUrl: ['', Validators.pattern(IMAGE_URL_PATTERN)],
    passwords: this.fb.group(
      {
        password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
        rePassword: ['', Validators.required],
      },
      { validators: passwordsMatch },
    ),
  });

  protected showError(path: string): boolean {
    const control = this.form.get(path);
    return !!control && control.touched && control.invalid;
  }

  submit(): void {
    this.submitted = this.form.getRawValue();
    this.form.reset();
  }
}
