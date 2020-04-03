import { Component, Inject, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReadBook } from '@app/shared/models/read-book.model';
import { FormActions } from '@app/shared/enums';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['../book-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDialogComponent {
  action = FormActions.Add;
  newBook: IReadBook;
  formInvalid: boolean;
  dialogClosed: EventEmitter<boolean> = new EventEmitter();
    
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public book: IReadBook
    ) {}
  
  getNewBook($event: IReadBook) { 
    this.newBook = $event;
  }

  getFormStatus($event: boolean) {
    this.formInvalid = $event;
  }

  onSubmit() {
    this.dialogClosed.emit(true);
    this.dialogRef.close(this.newBook); 
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
