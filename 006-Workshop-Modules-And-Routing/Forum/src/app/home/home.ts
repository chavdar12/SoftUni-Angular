import { Component } from '@angular/core';
import { Welcome } from '../shared/welcome/welcome';

@Component({
  selector: 'app-home',
  imports: [Welcome],
  template: `<div class="container"><app-welcome /></div>`,
})
export class Home {}
