import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: '../auth-form.css',
})
export class Login {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  protected readonly error = signal(false);

  login(event: Event, email: string, password: string): void {
    event.preventDefault();
    if (this.userService.login(email, password)) {
      this.router.navigate(['/themes']);
    } else {
      this.error.set(true);
    }
  }
}
