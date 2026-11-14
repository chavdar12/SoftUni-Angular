import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../core/notification/notification.service';
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
export default class Login {
  private readonly userService = inject(UserService);
  private readonly notifications = inject(NotificationService);
  private readonly router = inject(Router);

  protected readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, gmailValidator]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  login(): void {
    if (this.form.invalid) {
      return;
    }
    const { email, password } = this.form.getRawValue();
    // Errors (e.g. wrong password) are shown by the error interceptor.
    this.userService.login(email, password).subscribe((user) => {
      this.notifications.showSuccess(`Welcome back, ${user.username}!`);
      this.router.navigate(['/themes']);
    });
  }
}
