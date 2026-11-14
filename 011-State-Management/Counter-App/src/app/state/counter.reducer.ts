import { createReducer, on } from '@ngrx/store';
import { decrement, increment, incrementBy, reset } from './counter.actions';

export const initialState = 0;

// A pure function - every state transition is handled synchronously.
export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(incrementBy, (state, { by }) => state + by),
  on(reset, () => initialState),
);
