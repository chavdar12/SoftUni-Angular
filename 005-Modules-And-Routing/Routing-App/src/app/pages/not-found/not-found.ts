import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <h2>404 - Page Not Found</h2>
    <p>Go back <a routerLink="/home">home</a>.</p>
  `,
})
export class NotFound {}
