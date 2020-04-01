import { Component, Inject, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadBook } from '@app/shared/models/read-book.model';
import { FormActions } from '@app/shared/enums';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['../book-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDialogComponent {
    readonly action = FormActions.Edit;
    updatedBook: Partial<ReadBook>;
    dialogClosed: EventEmitter<Boolean> = new EventEmitter();
    
    constructor(
        public dialogRef: MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public book: ReadBook) {}
    
      getUpdatedBook($event: Partial<ReadBook>) {
        this.updatedBook = $event;
      }

      onSubmit() {
        this.dialogClosed.emit(true);
        this.dialogRef.close(this.updatedBook);
      }

      onNoClick() {
        this.dialogRef.close();
      }
}
