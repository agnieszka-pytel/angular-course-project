import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState, selectAll } from '../reducers/books.reducer';

export const booksFeatureSelector = createFeatureSelector<BookState>('books');

export const getAllBooks = createSelector(
  booksFeatureSelector,
  selectAll
)

export const areBooksLoaded = createSelector(
  booksFeatureSelector,
  state => state.booksLoaded
)
