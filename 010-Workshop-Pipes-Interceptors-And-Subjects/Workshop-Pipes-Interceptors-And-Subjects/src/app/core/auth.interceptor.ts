import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {IUser} from './interfaces';
import {AuthService} from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // catchError( err => {
      //   // Like: Promise.resolve(undefined);
      //   return of(undefined);
      // }),
      tap(event => {
          if (event instanceof HttpResponse) {
            if (event.url.endsWith('login') || event.url.endsWith('register')) {
              console.log('login/register happened');
              // TODO: save user
              const newlyLoggedUser: IUser = event.body;
              this.authService.handleLogin(newlyLoggedUser);
            } else if (event.url.endsWith('logout')) {
              this.authService.handleLogout();
            }
          }
        },
        // catchError(() => {

        // })
      ));
  }
}
