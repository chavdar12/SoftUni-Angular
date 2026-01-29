import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {IUser} from './interfaces';
import {StorageService} from './storage.service';

export interface CreateUserDto {
  username: string,
  email: string,
  password: string,
  tel?: string
}

@Injectable()
export class UserService {

  currentUser: IUser;

  constructor(private storage: StorageService, private httpClient: HttpClient) {
    console.log('UserService#constructor');
  }

  get isLogged() {
    return !!this.currentUser;
  }

  login$(userData: { email: string, password: string }): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${environment.apiUrl}/login`, userData, {withCredentials: true})
      .pipe(tap(user => this.currentUser = user))

    // Get all response with data
    /*
    return this.httpClient
      .post<IUser>(`${environment.apiUrl}/login`, userData, { withCredentials: true, observe: 'response' })
      .pipe(
        tap(response => console.log(response)),
        map(response => response.body),
        tap(user => this.currentUser = user)
      )
    */
  }

  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, {withCredentials: true})
      .pipe(
        tap(user => this.currentUser = user)
      )
  }

  logout(): void {

  }

  register$(userData: CreateUserDto): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiUrl}/register`, userData, {withCredentials: true});
  }
}
