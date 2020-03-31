import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BooksService } from '@app/shared/services/books.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ReadBook } from '@app/shared/models/read-book.model';
import { MatDialogRef } from '@angular/material/dialog';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent implements OnInit {

    @Input() dialogRef?: MatDialogRef<BookDialogComponent>;
    @Input() bookToUpdate?: ReadBook;
    @Input() dialogClosed: EventEmitter<Boolean>;

    @Output() updatedBook? = new EventEmitter<Partial<ReadBook>>(); 

    ratingValues: number[] = [1,2,3,4,5];  
    myForm: FormGroup;
    dialog: Boolean;

    constructor(private fb: FormBuilder, private booksService:BooksService){
    }

    ngOnInit(){
        this.dialog = this.dialogRef ? true : false;
        
        this.bookToUpdate ? 
        this.myForm = this.fb.group({
            title: this.bookToUpdate.title,
            author: this.bookToUpdate.author,
            rating: this.bookToUpdate.rating,
        }) : 
        this.myForm = this.fb.group({
            title: ['', Validators.required],
            author: ['', Validators.required],
            rating: ['', Validators.required],
        });
  
        this.myForm.valueChanges
            .pipe(
                debounceTime(500))
            .subscribe();

        if (this.dialogClosed) {
            this.dialogClosed.subscribe((data : Boolean) => { 
                this.updatedBook.emit(this.myForm.value)
            });
        }
    }

    onSubmit(){
        let data = this.myForm.value;
        this.myForm.reset();
        this.booksService.addReadBook(data);
    }

    get title(){
        return this.myForm.get('title');
    }

    get author(){
        return this.myForm.get('author');
    }

    get rating(){
        return this.myForm.get('rating');
    }
}
