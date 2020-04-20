import { Component, Inject, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReadBook } from '@app/shared/models/read-book.model';
import { FormActions } from '@app/shared/enums';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['../book-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDialogComponent {
  private readonly _action = FormActions.Edit;
  private _updatedBook: Partial<IReadBook>;
  private _dialogClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(
    private _dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) readonly book: IReadBook
  ) {}
    
  getUpdatedBook($event: Partial<IReadBook>) {
    this._updatedBook = $event;
  }

  onSubmit() {
    this._dialogClosed.emit(true);
    this._dialogRef.close(this._updatedBook);
  }

  onNoClick() {
    this._dialogRef.close();
  }

  get action(): FormActions {
    return this._action;
  }

  get updatedBook(): Partial<IReadBook> {
    return this._updatedBook;
  }

	get dialogClosed(): EventEmitter<boolean>  {
		return this._dialogClosed;
  }
  
  get dialogRef(): MatDialogRef<EditDialogComponent> {
    return this._dialogRef;
  }
}
