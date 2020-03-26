import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReadBook } from '@app/shared/models/read-book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor( private firestore: AngularFirestore ) { }

  getReadBooks(){
      return this.firestore.collection('readBooks').snapshotChanges();
  }

  addReadBook(data:ReadBook){
      return new Promise<any>((resolve, reject) => {
          this.firestore
            .collection('readBooks')
            .add(data)
            .then(res => {}, err => reject(err))
      });
  }
}
