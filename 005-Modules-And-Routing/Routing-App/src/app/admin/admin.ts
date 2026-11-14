import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
    <h2>Admin</h2>
    <p>This component lives in a lazy loaded chunk and is protected by a guard.</p>
  `,
})
export default class Admin {}
