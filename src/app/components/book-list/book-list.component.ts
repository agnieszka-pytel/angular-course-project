import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from '@app/shared/services/books.service';
import { IReadBook } from '@app/shared/models/read-book.model';
import { map } from 'rxjs/operators';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../book-dialog/edit/edit-dialog.component';
import { ConfirmDialogComponent } from '../book-dialog/confirm/confirm-dialog.component';
import { AddDialogComponent } from '../book-dialog/add/add-dialog.component';
import { FormActions } from '@app/shared/enums';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit, OnDestroy {

    _books: BehaviorSubject<IReadBook[]>;
    books$: Observable<IReadBook[]>;
    subscriptions: Subscription[];

    constructor(private booksService: BooksService, public dialog: MatDialog) {
        this._books = new BehaviorSubject([]);
        this.books$ = this._books.asObservable();
    }

    observeBooks(): void {
        this.subscriptions.push(
            this.booksService
                .getReadBooks().pipe(
                    map((data: DocumentChangeAction<unknown>[]): IReadBook[] => data
                        .map((element: DocumentChangeAction<unknown>): IReadBook => {
                            return {
                                id: element.payload.doc.id,
                                ...(element.payload.doc.data() as {})
                            } as IReadBook;
                            })
                    )
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

        dialogRef.componentInstance.action = FormActions.Add;

        this.subscriptions.push(
            dialogRef.afterClosed().subscribe((result: IReadBook): void => {
                if(result) {
                    this.addBook(result); 
                }  
            })
        )
    }

    addBook(book: IReadBook): void {
        this.subscriptions.push(
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

        this.subscriptions.push(
            dialogRef.afterClosed().subscribe((result: Partial<IReadBook>): void => {
                if(result) { 
                    this.editBook(book, result); 
                }  
            })    
        )
    }

    editBook(book: IReadBook, updatedBook: Partial<IReadBook>): void{
        this.subscriptions.push(
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

        this.subscriptions.push(
            dialogRef.afterClosed().subscribe((result: boolean): void => {
                if(result) { 
                    this.deleteBook(book);; 
                }  
            })            
        )
    }

    deleteBook(book: IReadBook): void{
        this.subscriptions.push(
            this.booksService
                .deleteReadBook(book.id)
                .subscribe()       
        )
    }

    ngOnInit() {
        this.subscriptions = [];
        this.observeBooks();
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s:Subscription): void => s.unsubscribe())
    }
}
