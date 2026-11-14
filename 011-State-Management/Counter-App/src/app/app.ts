import { Component } from '@angular/core';
import { MyCounter } from './my-counter/my-counter';

@Component({
  selector: 'app-root',
  imports: [MyCounter],
  template: `<app-my-counter />`,
})
export class App {}
