import { Component, input } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h2>Home</h2>
    <p>Use the navigation above to try out the router features.</p>
    @if (returnUrl()) {
      <p class="warning">
        <strong>{{ returnUrl() }}</strong> is protected by a guard - log in first (top right).
      </p>
    }
  `,
  styles: `
    .warning {
      color: #a94442;
    }
  `,
})
export class Home {
  // Query params are bound to inputs too (withComponentInputBinding).
  readonly returnUrl = input<string>();
}
