import { Component } from '@angular/core';
import { Posts } from './posts/posts';
import { RxjsDemo } from './rxjs-demo/rxjs-demo';

@Component({
  selector: 'app-root',
  imports: [Posts, RxjsDemo],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
