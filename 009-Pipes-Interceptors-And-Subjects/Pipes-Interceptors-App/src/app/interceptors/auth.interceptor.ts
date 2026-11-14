import { HttpInterceptorFn } from '@angular/common/http';

// A fake JWT - a real app would get it from the login response.
export const FAKE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsInVzZXJuYW1lIjoiUGVzaG8ifQ.signature';

// Attaches the token to every outgoing request.
export const authInterceptor: HttpInterceptorFn = (req, next) =>
  next(req.clone({ setHeaders: { Authorization: `Bearer ${FAKE_JWT}` } }));
