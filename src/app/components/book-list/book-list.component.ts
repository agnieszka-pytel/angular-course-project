import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { BooksService } from '@app/shared/services/books.service';
import { ReadBook } from '@app/shared/models/read-book.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit {

    books: Observable<ReadBook[]>;

    constructor(private booksService:BooksService){}

    getBooks(){
        this.books = this.booksService.getReadBooks().pipe(
            map(data => data.map(element => element.payload.doc.data() as ReadBook))
        )
    }

    ngOnInit(){this.getBooks()}
}
