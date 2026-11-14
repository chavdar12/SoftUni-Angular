import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { InputErrorDirective } from '../../shared/directives/input-error.directive';
import { FormStatus } from '../../shared/form-status/form-status';
import { gmailValidator } from '../../shared/validators/validators';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, InputErrorDirective, FormStatus],
  templateUrl: './login.html',
  styleUrl: '../auth-form.css',
})
export class Login {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  protected readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, gmailValidator]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });
  protected readonly error = signal(false);

  login(): void {
    if (this.form.invalid) {
      return;
    }
    const { email, password } = this.form.getRawValue();
    if (this.userService.login(email, password)) {
      this.router.navigate(['/themes']);
    } else {
      this.error.set(true);
    }
  }
}
