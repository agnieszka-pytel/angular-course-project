import { Component, Inject, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadBook } from '@app/shared/models/read-book.model';
import { FormActions } from '@app/shared/enums';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['../book-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDialogComponent {
    action = FormActions.Add;
    newBook: ReadBook;
    formInvalid: Boolean;
    dialogClosed: EventEmitter<Boolean> = new EventEmitter();
    
    constructor(
        public dialogRef: MatDialogRef<AddDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public book: ReadBook) {}
    
      getNewBook($event: ReadBook) { 
        this.newBook = $event;
      }

      getFormStatus($event: Boolean) {
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
