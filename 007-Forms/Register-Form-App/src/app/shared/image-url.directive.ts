import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IMAGE_URL_PATTERN } from './form-options';

// Listens to input events, validates the value starts with "http" and ends with jpg/png,
// colours the left border with Renderer2 and marks the control (in)valid via setErrors.
@Directive({
  selector: '[appImageUrl]',
  host: { '(input)': 'validate()' },
})
export class ImageUrlDirective {
  private readonly el = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly control = inject(NgControl, { self: true });

  validate(): void {
    const valid = IMAGE_URL_PATTERN.test(this.el.nativeElement.value);
    this.renderer.setStyle(
      this.el.nativeElement,
      'border-left',
      `5px solid ${valid ? '#42A948' : '#A94442'}`,
    );
    this.control.control?.setErrors(valid ? null : { incorrect: true });
  }
}
