import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BooksService } from '@app/shared/services/books.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { IReadBook } from '@app/shared/models/read-book.model';
import { MatDialogRef } from '@angular/material/dialog';
import { EditDialogComponent } from '../book-dialog/edit/edit-dialog.component';
import { AddDialogComponent } from '../book-dialog/add/add-dialog.component';
import { FormActions } from '@app/shared/enums';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormComponent implements OnInit {

    @Input() action: FormActions;
    @Input() dialogRef?: MatDialogRef<EditDialogComponent | AddDialogComponent>;
    @Input() bookToUpdate?: IReadBook;
    @Input() dialogClosed: EventEmitter<Boolean>;

    @Output() updatedBook? = new EventEmitter<Partial<IReadBook>>(); 
    @Output() newBook? = new EventEmitter<IReadBook>(); 
    @Output() formInvalid? = new EventEmitter<Boolean>();

    ratingValues: number[] = [1,2,3,4,5];  
    myForm: FormGroup;
 
    constructor(private fb: FormBuilder, private booksService:BooksService){
    }

    ngOnInit(){
        if (this.action === FormActions.Add){
            this.myForm = this.fb.group({
                title: ['', Validators.required],
                author: ['', Validators.required],
                rating: ['', Validators.required],
            });

            this.formInvalid.emit(this.myForm.invalid)   
        } else if (this.action === FormActions.Edit){
            this.myForm = this.fb.group({
                title: this.bookToUpdate.title,
                author: this.bookToUpdate.author,
                rating: this.bookToUpdate.rating,
            })
        }
  
        this.myForm.valueChanges
            .subscribe(() => {
                this.formInvalid.emit(this.myForm.invalid);
            });

    
        if (this.dialogClosed){
            this.dialogClosed.subscribe(() => {
                this.action === FormActions.Edit ? 
                    this.updatedBook.emit(this.myForm.value) :
                    this.newBook.emit(this.myForm.value)
            })
        }
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
