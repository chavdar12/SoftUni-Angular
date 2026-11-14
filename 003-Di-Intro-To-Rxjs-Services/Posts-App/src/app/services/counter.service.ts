import { Injectable, signal } from '@angular/core';

// Not providedIn root - each component that lists it in `providers` gets its own instance.
@Injectable()
export class CounterService {
  readonly count = signal(0);

  increment(): void {
    this.count.update((c) => c + 1);
  }
}
