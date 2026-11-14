import { computed, Injectable, signal } from '@angular/core';

export interface FakeUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  tel?: string;
}

// The workshop asks for a hardcoded id until real authentication is implemented (Part 4).
const FAKE_USER_ID = '5fa64b162183ce1728ff371d';

// Fake authentication: registered users live only in memory.
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly users: FakeUser[] = [
    {
      _id: FAKE_USER_ID,
      username: 'Johny',
      email: 'johny@gmail.com',
      password: '12345',
      tel: '+359885333885',
    },
  ];

  readonly currentUser = signal<FakeUser | null>(null);
  readonly isLoggedIn = computed(() => this.currentUser() !== null);

  login(email: string, password: string): boolean {
    const user = this.users.find((u) => u.email === email && u.password === password);
    this.currentUser.set(user ?? null);
    return !!user;
  }

  register(user: Omit<FakeUser, '_id'>): boolean {
    if (this.users.some((u) => u.email === user.email || u.username === user.username)) {
      return false;
    }
    const registered = { ...user, _id: FAKE_USER_ID };
    this.users.push(registered);
    this.currentUser.set(registered);
    return true;
  }

  logout(): void {
    this.currentUser.set(null);
  }
}
