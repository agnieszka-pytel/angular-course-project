import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { BooksService } from '@app/shared/services/books.service';
import { ReadBook } from '@app/shared/models/read-book.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
export class BookListComponent implements OnInit {

    books: Observable<ReadBook[]>;

    constructor(private booksService:BooksService, public dialog: MatDialog){}

    getBooks(): void {
        this.books = this.booksService
            .getReadBooks().pipe(
                map(data => data.map(element => {
                    return {
                        id: element.payload.doc.id,
                        ...(element.payload.doc.data() as {})
                    } as ReadBook;
                    })
                )
            )
    }

    addBookHandler(): void {
        const dialogRef = this.dialog.open(AddDialogComponent, {
            width: '50%',
            restoreFocus: false
        })

        dialogRef.componentInstance.action = FormActions.Add;

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.addBook(result); 
            }  
        })
    }

    addBook(book: ReadBook): void{
        this.booksService
            .addReadBook(book);
    }

    editBookHandler(book: ReadBook): void {
        const dialogRef = this.dialog.open(EditDialogComponent, {
            width: '50%',
            restoreFocus: false,
            data: book
        })

        dialogRef.afterClosed().subscribe(result => {
            if(result) { 
                this.editBook(book, result); 
            }  
        })
    }

    editBook(book: ReadBook, updatedBook: ReadBook): void{
        this.booksService
            .updateReadBook(book.id, updatedBook);
    }

    deleteBookHandler(book: ReadBook): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '50%',
            restoreFocus: false,
            data: book
        })

        dialogRef.afterClosed().subscribe(result => {
            if(result) { 
                this.deleteBook(book);; 
            }  
        })
    }

    deleteBook(book: ReadBook): void{
        this.booksService
            .deleteReadBook(book.id);
    }

    ngOnInit(){this.getBooks()}
}
