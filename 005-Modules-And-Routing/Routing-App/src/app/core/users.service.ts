import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${API_URL}/${id}`);
  }
}
