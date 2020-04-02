import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IReadBook } from '@app/shared/models/read-book.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Collections, BookMessages } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor( private firestore: AngularFirestore, private snackBar: MatSnackBar ) { }

  getReadBooks(){
      return this.firestore.collection(Collections.ReadBooks).snapshotChanges();
  }

  addReadBook(data:IReadBook){
      let today = new Date();
      data.date = today.toLocaleDateString();
      return new Promise<any>((resolve, reject) => {
          this.firestore
            .collection(Collections.ReadBooks)
            .add(data)
            .then(
                res => { this.showMessage(BookMessages.SuccessAdd) },
                err => { this.showMessage(BookMessages.ErrorAdd); reject(err) }
            )
      });
  }

  updateReadBook(id:string, data: Partial<IReadBook>) {
      return new Promise<any>((resolve, reject) => {
          this.firestore
            .collection(Collections.ReadBooks)
            .doc(id)
            .update(data)
            .then(
                res => { this.showMessage(BookMessages.SuccessEdit) },
                err => { this.showMessage(BookMessages.ErrorEdit); reject(err) }
            )
      })
  }

  deleteReadBook(id: string){
    return new Promise<any>((resolve, reject) => {
        this.firestore
            .collection(Collections.ReadBooks)
            .doc(id)
            .delete()
            .then(
                res => { this.showMessage(BookMessages.SuccessDelete) },
                err => { this.showMessage(BookMessages.ErrorDelete); reject(err) }
            )
        })
  }

  showMessage(message: string) {
      this.snackBar.open(message, '', { duration: 2500 })
  }
}
