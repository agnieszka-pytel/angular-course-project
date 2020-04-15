import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { IReadBook } from '@app/shared/models/read-book.model';
import * as fromBookActions from '../actions/books.actions'

export interface BookState extends EntityState<IReadBook> {
  booksLoaded: boolean,
  error?: Error | any;
}

export const booksFeatureKey = 'books';

export const adapter: EntityAdapter<IReadBook>= createEntityAdapter<IReadBook>()

export const initialState = adapter.getInitialState({
  booksLoaded: false
})

export const bookReducer = createReducer(
  initialState,

  on(fromBookActions.loadBooksSuccess, (state, { books }) => {
    return adapter.setAll(
      books,
      {...state, booksLoaded: true}
    )
  }),

  on(fromBookActions.loadBooksFail, (state, { error }) => {
    return {
      ...state,
      error: error
    }
  }),

  on(fromBookActions.addBookSuccess, (state, { book }) => {
    return adapter.addOne(book, state);
  }),

  on(fromBookActions.addBookFail, (state, { error }) => {
    return {
      ...state,
      error: error
    }
  }),

  on(fromBookActions.editBookSuccess, (state, { update }) => {
    return adapter.updateOne(update, state)
  }),

  on(fromBookActions.editBookFail, (state, { error }) => {
    return {
      ...state,
      error: error
    }
  }),

  on(fromBookActions.deleteBookSuccess, (state, { id }) => {
    return adapter.removeOne(id, state)
  }),

  on(fromBookActions.deleteBookFail, (state, { error }) => {
    return {
      ...state,
      error: error
    }
  }),
)

export function reducer(state: BookState | undefined, action: Action) {
  return bookReducer(state, action);
}

export const getBooksLoading = (state: BookState) => state.booksLoaded;


export const { selectAll } = adapter.getSelectors();

