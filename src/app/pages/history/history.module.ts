import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryRoutingModule } from './history-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { HistoryComponent } from './history.component';
import { BookFormComponent } from '@app/components/book-form/book-form.component';
import { BookListComponent } from '@app/components/book-list/book-list.component';
import { BookDetailsComponent } from '@app/components/book-details/book-details.component';
import { BooksService } from '@app/shared/services/books.service';
import { EditDialogComponent } from '@app/components/book-dialog/edit/edit-dialog.component';
import { ConfirmDialogComponent } from '@app/components/book-dialog/confirm/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { AddDialogComponent } from '@app/components/book-dialog/add/add-dialog.component';
import { ErrorHandlerService } from '@app/shared/services/error-handler.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from '@app/store/effects/books.effects';
import * as fromBooksReducer from '@app/store/reducers/books.reducer';
 
@NgModule({
  imports: [
    CommonModule,
    HistoryRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    StoreModule.forFeature(fromBooksReducer.booksFeatureKey, fromBooksReducer.bookReducer),
    EffectsModule.forFeature([BookEffects]),
  ],
  declarations: [
    HistoryComponent,
    BookFormComponent,
    BookListComponent,
    BookDetailsComponent,
    EditDialogComponent,
    ConfirmDialogComponent,
    AddDialogComponent
  ],
  providers: [
      BooksService,
      ErrorHandlerService
  ]
})
export class HistoryModule { }
