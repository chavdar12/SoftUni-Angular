import { Injectable, signal } from '@angular/core';

// Authentication is not covered yet - the logged-in state is hardcoded.
@Injectable({ providedIn: 'root' })
export class UserService {
  readonly isLoggedIn = signal(false);
  readonly username = signal('Johny');
}
