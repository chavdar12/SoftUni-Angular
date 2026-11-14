import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { InputErrorDirective } from '../../shared/directives/input-error.directive';
import { FormStatus } from '../../shared/form-status/form-status';
import { gmailValidator, matchValidator } from '../../shared/validators/validators';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, InputErrorDirective, FormStatus],
  templateUrl: './register.html',
  styleUrl: '../auth-form.css',
})
export class Register {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, gmailValidator]],
    telRegion: ['+359'],
    tel: [''],
    passwords: this.fb.group(
      {
        password: [
          '',
          [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Za-z0-9]+$/)],
        ],
        rePassword: ['', Validators.required],
      },
      { validators: matchValidator('password', 'rePassword') },
    ),
  });
  protected readonly error = signal<string | null>(null);

  // Both password fields are styled as invalid when the group (or either field) is invalid.
  protected get passwordsInvalid(): boolean {
    const group = this.form.controls.passwords;
    return (group.controls.password.touched || group.controls.rePassword.touched) && group.invalid;
  }

  register(): void {
    if (this.form.invalid) {
      return;
    }
    const { username, email, telRegion, tel, passwords } = this.form.getRawValue();
    const registered = this.userService.register({
      username,
      email,
      password: passwords.password,
      tel: tel ? `${telRegion}${tel}` : undefined,
    });
    if (!registered) {
      this.error.set('This email/username is already registered!');
      return;
    }
    this.router.navigate(['/themes']);
  }
}
