import { Component, signal } from '@angular/core';
import { filter, map, Observable, range, reduce, tap } from 'rxjs';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-rxjs-demo',
  templateUrl: './rxjs-demo.html',
  styleUrl: './rxjs-demo.css',
  // Component-level provider: this component (and its children) get a separate instance.
  providers: [CounterService],
})
export class RxjsDemo {
  protected readonly output = signal<string[]>([]);

  constructor(protected readonly counter: CounterService) {}

  runMap(): void {
    this.collect('map: i ** 2', range(1, 10).pipe(map((i) => i ** 2)));
  }

  runFilter(): void {
    this.collect('filter: even numbers', range(1, 10).pipe(filter((i) => i % 2 === 0)));
  }

  runReduce(): void {
    this.collect('reduce: sum of 1..10', range(1, 10).pipe(reduce((acc, i) => acc + i, 0)));
  }

  runCold(): void {
    // Cold observable: every subscriber starts its own execution (the tap runs twice).
    const lines: string[] = [];
    const obs = range(1, 3).pipe(tap((i) => lines.push(`tap: Hello ${i}`)));
    obs.subscribe((i) => lines.push(`first sub ${i}`));
    obs.subscribe((i) => lines.push(`second sub ${i}`));
    this.output.set(['cold observable, two subscribers', ...lines]);
  }

  private collect(title: string, source: Observable<number>): void {
    const lines: string[] = [title];
    source.subscribe((value) => lines.push(String(value)));
    this.output.set(lines);
  }
}
