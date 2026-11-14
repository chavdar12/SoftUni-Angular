import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav>
      <a routerLink="/pipes" routerLinkActive="active">Pipes</a>
      <a routerLink="/interceptors" routerLinkActive="active">Interceptors</a>
      <a routerLink="/subjects" routerLinkActive="active">Subjects</a>
    </nav>
    <main><router-outlet /></main>
  `,
  styles: `
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    nav {
      display: flex;
      gap: 1rem;
      padding: 1rem 2rem;
      background: #6a1b9a;
    }
    nav a {
      color: white;
      text-decoration: none;
    }
    nav a.active {
      text-decoration: underline;
    }
    main {
      padding: 0 2rem;
    }
  `,
})
export class App {}
