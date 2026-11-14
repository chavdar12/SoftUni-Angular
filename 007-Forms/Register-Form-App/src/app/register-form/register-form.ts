import { JsonPipe } from '@angular/common';
import { Component, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  BUILDING_TYPES,
  COUNTRY_CODES,
  FULL_NAME_PATTERN,
  PASSWORD_PATTERN,
  PHONE_PATTERN,
} from '../shared/form-options';
import { ImageUrlDirective } from '../shared/image-url.directive';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule, ImageUrlDirective, JsonPipe],
  templateUrl: './register-form.html',
  styleUrl: '../shared/form.css',
})
export class RegisterForm {
  protected readonly form = viewChild.required<NgForm>('form');

  protected readonly countryCodes = COUNTRY_CODES;
  protected readonly buildingTypes = BUILDING_TYPES;
  protected readonly fullNamePattern = FULL_NAME_PATTERN.source;
  protected readonly phonePattern = PHONE_PATTERN.source;
  protected readonly passwordPattern = PASSWORD_PATTERN.source;

  protected submitted: unknown = null;

  submit(): void {
    this.submitted = this.form().value;
    this.form().resetForm({ countryCode: COUNTRY_CODES[0], buildingType: BUILDING_TYPES[0] });
  }
}
