import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly isLoggedIn = signal(false);

  toggle(): void {
    this.isLoggedIn.update((v) => !v);
  }
}
