import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { User } from './user';
import { UsersService } from './users.service';

// Fetches the user before the route is activated - the component receives it as an input.
export const userResolver: ResolveFn<User> = (route) =>
  inject(UsersService).getUserById(route.paramMap.get('id')!);
