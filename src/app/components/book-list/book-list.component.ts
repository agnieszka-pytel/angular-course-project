import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Inject } from '@angular/core';
import { BooksService } from '@app/shared/services/books.service';
import { IReadBook } from '@app/shared/models/read-book.model';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../book-dialog/edit/edit-dialog.component';
import { ConfirmDialogComponent } from '../book-dialog/confirm/confirm-dialog.component';
import { AddDialogComponent } from '../book-dialog/add/add-dialog.component';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { AbstractSubscriptionComponent } from '@app/abstracts/abstract-subscription.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent extends AbstractSubscriptionComponent implements OnInit, OnDestroy {

  private _books: BehaviorSubject<IReadBook[]>;
  private _books$: Observable<IReadBook[]>;

  constructor(private booksService: BooksService, public dialog: MatDialog ) {
    super();
    this._books = new BehaviorSubject([]);
    this._books$ = this._books.asObservable();
  }

  observeBooks(): void {
    this._subscriptions.push(
      this.booksService
      .getReadBooks().pipe(
        map((data: DocumentChangeAction<unknown>[]): IReadBook[] => {
          return data.map((element: DocumentChangeAction<unknown>): IReadBook => {
            return {
              id: element.payload.doc.id,
              ...(element.payload.doc.data() as {})
            } as IReadBook;
          })
        })
      ).subscribe((data: IReadBook[]): void => {
        this._books.next(data)
      })
    )
  }

  addBookHandler(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '50%',
      restoreFocus: false
    })

    this._subscriptions.push(
      dialogRef.afterClosed().subscribe((result: IReadBook): void => {
        if (result) {
          this.addBook(result); 
        }  
      })
    )
  }

  addBook(book: IReadBook): void {
    this._subscriptions.push(
      this.booksService
      .addReadBook(book)
      .subscribe()
    )
  }

  editBookHandler(book: IReadBook): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '50%',
      restoreFocus: false,
      data: book
    })

    this._subscriptions.push(
      dialogRef.afterClosed().subscribe((result: Partial<IReadBook>): void => {
          if (result) { 
            this.editBook(book, result); 
          }  
      })    
    )
  }

  editBook(book: IReadBook, updatedBook: Partial<IReadBook>): void{
    this._subscriptions.push(
      this.booksService
      .updateReadBook(book.id, updatedBook)
      .subscribe()
    )
  }

  deleteBookHandler(book: IReadBook): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '50%',
      restoreFocus: false,
      data: book
    })

    this._subscriptions.push(
      dialogRef.afterClosed().subscribe((result: boolean): void => {
        if (result) { 
          this.deleteBook(book);; 
        }  
      })            
    )
  }

  deleteBook(book: IReadBook): void{
    this._subscriptions.push(
      this.booksService
      .deleteReadBook(book.id)
      .subscribe()       
    )
  }

  get books$(): Observable<IReadBook[]> {
    return this._books$;
  }

  ngOnInit() {
    this.observeBooks();
  }
}
