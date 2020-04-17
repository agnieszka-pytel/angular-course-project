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
  private readonly _action = FormActions.Add;
  private _newBook: IReadBook;
  private _formInvalid: boolean;
  private _dialogClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
    
  constructor(
    private _dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) readonly book: IReadBook
    ) {}
  
  getNewBook($event: IReadBook) { 
    this._newBook = $event;
  }

  getFormStatus($event: boolean) {
    this._formInvalid = $event;
  }

  onSubmit() {
    this._dialogClosed.emit(true);
    this._dialogRef.close(this._newBook); 
  }

  onNoClick() {
    this._dialogRef.close();
  }

  get action(): FormActions {
    return this._action;
  }

	get formInvalid(): boolean {
		return this._formInvalid;
  }

	get dialogClosed(): EventEmitter<boolean>  {
		return this._dialogClosed;
  }
  
  get dialogRef(): MatDialogRef<AddDialogComponent> {
    return this._dialogRef;
  }
}
