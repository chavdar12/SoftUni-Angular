import { Component, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../core/user';

@Component({
  selector: 'app-user-profile',
  template: `
    <h3>{{ user().name }} - profile</h3>
    <p>Route param id: {{ id() }}</p>
    <p>Query param tab: {{ tab() }}</p>
    <p>Fragment (from the snapshot): {{ fragment }}</p>
    <p>Phone: {{ user().phone }}</p>
    <p id="website">Website: {{ user().website }}</p>
  `,
})
export class UserProfile {
  readonly id = input.required<string>();
  readonly tab = input<string>();
  readonly user = input.required<User>();

  protected readonly fragment = inject(ActivatedRoute).snapshot.fragment;
}
