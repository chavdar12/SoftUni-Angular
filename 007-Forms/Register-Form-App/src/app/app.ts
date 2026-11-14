import { Component } from '@angular/core';
import { RegisterForm } from './register-form/register-form';
import { RegisterFormReactive } from './register-form-reactive/register-form-reactive';

@Component({
  selector: 'app-root',
  imports: [RegisterForm, RegisterFormReactive],
  template: `
    <div class="forms">
      <div><app-register-form /></div>
      <div><app-register-form-reactive /></div>
    </div>
  `,
  styles: `
    .forms {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      justify-content: center;
      padding: 2rem;
      font-family: system-ui, sans-serif;
    }
  `,
})
export class App {}
