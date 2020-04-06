import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IReadBook } from '@app/shared/models/read-book.model';
import { MatDialogRef } from '@angular/material/dialog';
import { EditDialogComponent } from '../book-dialog/edit/edit-dialog.component';
import { AddDialogComponent } from '../book-dialog/add/add-dialog.component';
import { FormActions, BookFormFields } from '@app/shared/enums';

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
  @Input() dialogClosed: EventEmitter<boolean>;

  @Output() updatedBook? = new EventEmitter<Partial<IReadBook>>(); 
  @Output() newBook? = new EventEmitter<IReadBook>(); 
  @Output() formInvalid? = new EventEmitter<boolean>();

  readonly ratingValues: number[] = [1,2,3,4,5];  
  private _myForm: FormGroup;
 
  constructor(private fb: FormBuilder) { }

  ngOnInit(){
    switch(this.action){
      case FormActions.Add:
        this._myForm = this.fb.group({
          title: ['', Validators.required],
          author: ['', Validators.required],
          rating: ['', Validators.required],
        });

        this.formInvalid.emit(this._myForm.invalid)  
        break;
      case FormActions.Edit:
        this._myForm = this.fb.group({
          title: this.bookToUpdate.title,
          author: this.bookToUpdate.author,
          rating: this.bookToUpdate.rating,
        })
        break;
    }
  
    this._myForm.valueChanges
    .subscribe(() => {
      this.formInvalid.emit(this._myForm.invalid);
    });
    
    if (this.dialogClosed) {
      this.dialogClosed.subscribe((): void => {
        this.action === FormActions.Edit ? 
        this.updatedBook.emit(this._myForm.value) :
        this.newBook.emit(this._myForm.value)
      })
    }
  }

  get title(): AbstractControl {
    return this._myForm.get(BookFormFields.Title);
  }

  get author(): AbstractControl {
    return this._myForm.get(BookFormFields.Author);
  }

  get rating(): AbstractControl {
    return this._myForm.get(BookFormFields.Rating);
  }

  get myForm(): FormGroup {
    return this._myForm;
  }
}
