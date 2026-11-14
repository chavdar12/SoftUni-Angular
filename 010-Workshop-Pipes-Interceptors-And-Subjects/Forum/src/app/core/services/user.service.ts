import { HttpClient, HttpContext } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { SKIP_ERROR_NOTIFICATION } from '../interceptors/error.interceptor';
import { User } from '../../models/user';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  rePassword: string;
  tel?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  readonly currentUser = signal<User | null>(null);
  readonly isLoggedIn = computed(() => this.currentUser() !== null);

  // Called once on startup: the JWT lives in an httpOnly cookie, so ask the API who we are.
  loadProfile(): Observable<User | null> {
    return this.http
      .get<User>('/api/users/profile', {
        context: new HttpContext().set(SKIP_ERROR_NOTIFICATION, true),
      })
      .pipe(
        catchError(() => of(null)),
        tap((user) => this.currentUser.set(user)),
      );
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>('/api/login', { email, password })
      .pipe(tap((user) => this.currentUser.set(user)));
  }

  register(data: RegisterData): Observable<User> {
    return this.http
      .post<User>('/api/register', data)
      .pipe(tap((user) => this.currentUser.set(user)));
  }

  logout(): Observable<void> {
    return this.http.post<void>('/api/logout', {}).pipe(tap(() => this.currentUser.set(null)));
  }

  updateProfile(changes: Pick<User, 'username' | 'email' | 'tel'>): Observable<User> {
    return this.http
      .put<User>('/api/users/profile', changes)
      .pipe(tap((user) => this.currentUser.set(user)));
  }

  clear(): void {
    this.currentUser.set(null);
  }
}
