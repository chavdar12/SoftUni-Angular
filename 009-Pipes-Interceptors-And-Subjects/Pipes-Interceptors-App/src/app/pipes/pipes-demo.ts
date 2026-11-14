import { AsyncPipe, DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { interval, map, take } from 'rxjs';
import { ShortenPipe } from './shorten.pipe';

@Component({
  selector: 'app-pipes-demo',
  imports: [UpperCasePipe, LowerCasePipe, TitleCasePipe, DatePipe, AsyncPipe, ShortenPipe],
  template: `
    <h2>Pipes</h2>
    <ul>
      <li>uppercase: {{ username | uppercase }}</li>
      <li>chained lowercase | titlecase: {{ username | lowercase | titlecase }}</li>
      <li>date: 'fullDate': {{ creationDate | date: 'fullDate' }}</li>
      <li>date: 'MM/dd/yyyy': {{ creationDate | date: 'MM/dd/yyyy' }}</li>
      <li>custom shorten: {{ description | shorten }}</li>
      <li>custom shorten:25: {{ description | shorten: 25 }}</li>
      <li>async (promise, resolves after 3s): {{ text | async }}</li>
      <li>async (observable): {{ counter$ | async }}</li>
    </ul>
  `,
})
export default class PipesDemo {
  protected readonly username = 'pESHO pETROV';
  protected readonly creationDate = new Date(2020, 10, 7);
  protected readonly description = 'Angular pipes transform data right inside the template.';

  protected readonly text = new Promise<string>((resolve) =>
    setTimeout(() => resolve('show some text'), 3000),
  );
  // The async pipe subscribes and unsubscribes automatically.
  protected readonly counter$ = interval(1000).pipe(
    take(10),
    map((i) => `tick ${i + 1}`),
  );
}
