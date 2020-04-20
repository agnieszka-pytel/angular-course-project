import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReadBook } from '@app/shared/models/read-book.model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['../book-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
  constructor(
    private _dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) readonly book: IReadBook
  ) {}

  onSubmit() {
    this._dialogRef.close(true);
  }

  onNoClick() {
    this._dialogRef.close();
  }

  get dialogRef(): MatDialogRef<ConfirmDialogComponent> {
    return this._dialogRef;
  }
}
