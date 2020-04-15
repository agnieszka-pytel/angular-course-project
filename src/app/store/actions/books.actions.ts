import { createAction, props } from '@ngrx/store';
import { IReadBook } from '@app/shared/models/read-book.model';
import { Update } from '@ngrx/entity';

export enum BookActionTypes {
  LoadBooks = "[Book List] Load Books",
  LoadBooksSuccess = "[Book List] Load Books Success",
  LoadBooksFail = "[Book List] Load Books Fail",
  EditBook = "[Book List] Edit Book",
  EditBookFail = "[Book List] Edit Book Fail",
  AddBook = "[Book List] Add Book",
  AddBookFail = "[Book List] Add Book Fail",
  DeleteBook = "[Book List] Delete Book",
  DeleteBookFail = "[Book List] Delete Book Fail",
}

export const loadBooks = createAction(BookActionTypes.LoadBooks)

export const loadBooksSuccess = createAction(
  BookActionTypes.LoadBooksSuccess,
  props<{ books: IReadBook[] }>()
)

export const loadBooksFail = createAction(
  BookActionTypes.LoadBooksFail,
  props<{ error: Error | any }>()
)

export const addBook = createAction(
  BookActionTypes.AddBook,
  props<{ book: IReadBook }>()
)

export const addBookFail = createAction(
  BookActionTypes.AddBookFail,
  props<{ error: Error | any }>()
)

export const editBook = createAction(
  BookActionTypes.EditBook,
  props<{ update: Update<IReadBook> }>()
)

export const editBookFail = createAction(
  BookActionTypes.EditBookFail,
  props<{ error: Error | any }>()
)

export const deleteBook = createAction(
  BookActionTypes.DeleteBook,
  props<{ id: string }>()
)

export const deleteBookFail = createAction(
  BookActionTypes.DeleteBookFail,
  props<{ error: Error | any }>()
)
