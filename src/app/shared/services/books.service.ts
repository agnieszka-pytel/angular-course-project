import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { IReadBook } from '@app/shared/models/read-book.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Collections, BookMessages } from '../enums';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor( private firestore: AngularFirestore, private snackBar: MatSnackBar ) { }

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
          map(res => {
              this.showMessage(BookMessages.SuccessAdd)
            }),
          catchError(error => of(this.showMessage(BookMessages.ErrorAdd)))
      )
  }

  updateReadBook(id: string, data: Partial<IReadBook>): Observable<void> {
      return from(
          this.firestore
            .collection(Collections.ReadBooks)
            .doc(id)
            .update(data)
      ).pipe(
          map(res => {
              this.showMessage(BookMessages.SuccessEdit)
            }),
            catchError(error => of(this.showMessage(BookMessages.ErrorEdit)))
        )
  }

  deleteReadBook(id: string): Observable<void> {
    return from(
        this.firestore
            .collection(Collections.ReadBooks)
            .doc(id)
            .delete()
    ).pipe(
        map(res => {
            this.showMessage(BookMessages.SuccessDelete)
          }),
          catchError(error => of(this.showMessage(BookMessages.ErrorDelete)))
      )
  }

  showMessage(message: string): void {
      this.snackBar.open(message, '', { duration: 2500 })
  }
}
