import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCount = createFeatureSelector<number>('count');
export const selectIsEven = createSelector(selectCount, (count) => count % 2 === 0);
