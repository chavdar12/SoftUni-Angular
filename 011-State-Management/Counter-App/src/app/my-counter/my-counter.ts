import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, incrementBy, reset } from '../state/counter.actions';
import { selectCount, selectIsEven } from '../state/counter.selectors';

@Component({
  selector: 'app-my-counter',
  imports: [AsyncPipe],
  templateUrl: './my-counter.html',
  styleUrl: './my-counter.css',
})
export class MyCounter {
  private readonly store = inject(Store);

  // Classic: a stream connected to the `count` state, unwrapped with the async pipe.
  protected readonly count$: Observable<number> = this.store.select(selectCount);
  // Modern: the same state read as a signal.
  protected readonly isEven = this.store.selectSignal(selectIsEven);

  increment(): void {
    this.store.dispatch(increment());
  }

  decrement(): void {
    this.store.dispatch(decrement());
  }

  incrementBy(by: number): void {
    this.store.dispatch(incrementBy({ by }));
  }

  reset(): void {
    this.store.dispatch(reset());
  }
}
