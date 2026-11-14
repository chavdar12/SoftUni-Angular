import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: '../auth-form.css',
})
export class Register {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  protected readonly error = signal<string | null>(null);

  register(
    event: Event,
    username: string,
    email: string,
    tel: string,
    password: string,
    rePassword: string,
  ): void {
    event.preventDefault();
    if (password !== rePassword) {
      this.error.set('Passwords do not match!');
      return;
    }
    if (!this.userService.register({ username, email, password, tel })) {
      this.error.set('This email/username is already registered!');
      return;
    }
    this.router.navigate(['/themes']);
  }
}
