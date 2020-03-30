import { Component, Inject, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadBook } from '@app/shared/models/read-book.model';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDialogComponent {
    updatedBook: Partial<ReadBook>;
    dialogClosed: EventEmitter<Boolean> = new EventEmitter();
    
    constructor(
        public dialogRef: MatDialogRef<BookDialogComponent>,
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
