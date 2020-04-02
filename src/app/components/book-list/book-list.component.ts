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

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit, OnDestroy {

    _books: BehaviorSubject<IReadBook[]>;
    books: Observable<IReadBook[]>;
    subscriptions: Subscription[];

    constructor(private booksService: BooksService, public dialog: MatDialog) {
        this._books = new BehaviorSubject([]);
        this.books = this._books.asObservable();
    }

    getBooks(): void {
        this.subscriptions.push(
            this.booksService
                .getReadBooks().pipe(
                    map(data => data.map(element => {
                        return {
                            id: element.payload.doc.id,
                            ...(element.payload.doc.data() as {})
                        } as IReadBook;
                        })
                    )
                ).subscribe(data => {
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
            dialogRef.afterClosed().subscribe(result => {
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
            dialogRef.afterClosed().subscribe(result => {
                if(result) { 
                    this.editBook(book, result); 
                }  
            })    
        )
    }

    editBook(book: IReadBook, updatedBook: IReadBook): void{
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
            dialogRef.afterClosed().subscribe(result => {
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
        this.getBooks();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe())
    }
}
