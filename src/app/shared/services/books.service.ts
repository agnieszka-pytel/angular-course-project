import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { IReadBook } from '@app/shared/models/read-book.model';
import { Collections, BookMessages } from '../enums';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor( private firestore: AngularFirestore, private errorHandler: ErrorHandlerService) { }

  getReadBooks(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection(Collections.ReadBooks).snapshotChanges();
  }

  addReadBook(data: IReadBook): Observable<void> {
    let today = new Date();
    data.date = today.toLocaleDateString();

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

  updateReadBook(id: string, data: Partial<IReadBook>): Observable<void> {
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

  deleteReadBook(id: string): Observable<void> {
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
