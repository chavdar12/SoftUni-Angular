import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../core/user';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink],
  template: `
    <h3>{{ user().name }}</h3>
    <p>Email: {{ user().email }}</p>
    <a
      [routerLink]="['/users', user().id, 'profile']"
      [queryParams]="{ tab: 'contacts' }"
      fragment="website"
      >Full profile (guarded)</a
    >
  `,
})
export class UserDetail {
  // Provided by the resolver under the `user` key.
  readonly user = input.required<User>();
}
