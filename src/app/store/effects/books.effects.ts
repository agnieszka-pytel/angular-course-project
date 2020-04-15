import { createEffect, ofType, Actions } from '@ngrx/effects';
import { BooksService } from '@app/shared/services/books.service';
import * as fromBookActions from '../actions/books.actions'
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
 export class BookEffects {

  constructor(private booksService: BooksService, private actions$: Actions){}
   
  loadBooks$ = createEffect(() => this.actions$.pipe(
    ofType(fromBookActions.loadBooks),
    mergeMap(() => this.booksService.getReadBooks()
    .pipe(
      map(books => fromBookActions.loadBooksSuccess({ books })),
      catchError(error => of(fromBookActions.loadBooksFail({ error })))
    ))
  ))

  addBook$ = createEffect(() => this.actions$.pipe(
    ofType(fromBookActions.addBook),
    mergeMap(action => this.booksService.addReadBook(action.book)
    .pipe(
      map((book) => fromBookActions.addBookSuccess({ book })),
      catchError(error => of(fromBookActions.addBookFail({ error })))
    ))
  ), { dispatch: false })

  editBook$ = createEffect(() => this.actions$.pipe(
    ofType(fromBookActions.editBook),
    mergeMap(action => this.booksService.updateReadBook(action.update.id.toString(), action.update.changes)
    .pipe(
      map(update => fromBookActions.editBookSuccess({ update })),
      catchError(error => of(fromBookActions.editBookFail({ error })))
    ))
  ), { dispatch: false })

  deleteBook$ = createEffect(() => this.actions$.pipe(
    ofType(fromBookActions.deleteBook),
    mergeMap(action => this.booksService.deleteReadBook(action.id)
    .pipe(
      map(id => fromBookActions.deleteBookSuccess({ id })),
      catchError(error => of(fromBookActions.deleteBookFail({ error })))
    ))
  ), { dispatch: false })

}
