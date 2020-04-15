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
import { Store, select } from '@ngrx/store';
import * as fromBookSelectors from '@app/store/selectors/books.selectors';
import * as fromBookActions from '@app/store/actions/books.actions';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent extends AbstractSubscriptionComponent implements OnInit, OnDestroy {

  private _books$: Observable<IReadBook[]> = this.store.pipe(select(fromBookSelectors.getAllBooks));

  constructor(private store: Store<IReadBook[]>, private booksService: BooksService, public dialog: MatDialog ) {
    super();
  }

  addBook(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '50%',
      restoreFocus: false
    })

    this._subscriptions.push(
      dialogRef.afterClosed().subscribe((newBook: IReadBook): void => {
        if (newBook) {
          const today = new Date();
          newBook.date = today.toLocaleDateString();
          this.store.dispatch(fromBookActions.addBook({book: newBook}));
        }  
      })
    )
  }

  editBook(book: IReadBook): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '50%',
      restoreFocus: false,
      data: book
    })

    this._subscriptions.push(
      dialogRef.afterClosed().subscribe((updates: Partial<IReadBook>): void => {
        if (updates) { 
          const update: Update<IReadBook> = {
            id: book.id,
            changes: {
              ...book,
              ...updates
            }
          }
          this.store.dispatch(fromBookActions.editBook({ update }))
        }  
      })    
    )
  }

  deleteBook(book: IReadBook): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '50%',
      restoreFocus: false,
      data: book
    })

    this._subscriptions.push(
      dialogRef.afterClosed().subscribe((confirmDelete: boolean): void => {
        if (confirmDelete) { 
          this.store.dispatch(fromBookActions.deleteBook({ id: book.id })); 
        }  
      })            
    )
  }

  get books$(): Observable<IReadBook[]> {
    return this._books$;
  }

  ngOnInit() {
    this.store.dispatch(fromBookActions.loadBooks());
  }
}
