import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { IReadBook } from '@app/shared/models/read-book.model';
import { Collections, BookMessages } from '../enums';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Action } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor( private firestore: AngularFirestore, private errorHandler: ErrorHandlerService) { }

  getReadBooks(): Observable<IReadBook[]> {
    return this.firestore.collection(Collections.ReadBooks).snapshotChanges().pipe(
      map((data: DocumentChangeAction<unknown>[]): IReadBook[] => {
        return data.map((element: DocumentChangeAction<unknown>): IReadBook => {
          return {
            id: element.payload.doc.id,
            ...(element.payload.doc.data() as {})
          } as IReadBook;
        })
      })
    );
  }

  addReadBook(data: IReadBook): Observable<any> {
    return from(
      this.firestore
      .collection(Collections.ReadBooks)
      .add(data)
    ).pipe(
      map((res): void => {
        this.errorHandler.showMessage(BookMessages.SuccessAdd)
      }),
      catchError((error): Observable<void> => of(this.errorHandler.showMessage(BookMessages.ErrorAdd)))
    )
  }

  updateReadBook(id: string, data: Partial<IReadBook>): Observable<any> {
    return from(
      this.firestore
      .collection(Collections.ReadBooks)
      .doc(id)
      .update(data)
    ).pipe(
      map((res): void => {
        this.errorHandler.showMessage(BookMessages.SuccessEdit)
      }),
      catchError((error): Observable<void> => of(this.errorHandler.showMessage(BookMessages.ErrorEdit)))
    )
  }

  deleteReadBook(id: string): Observable<any> {
    return from(
      this.firestore
      .collection(Collections.ReadBooks)
      .doc(id)
      .delete()
    ).pipe(
      map((res): void => {
        this.errorHandler.showMessage(BookMessages.SuccessDelete)
      }),
      catchError((error): Observable<void> => of(this.errorHandler.showMessage(BookMessages.ErrorDelete)))
    )
  }
}
