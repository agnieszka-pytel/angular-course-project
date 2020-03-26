import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryRoutingModule } from './history-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

import { HistoryComponent } from './history.component';
import { BooksComponent } from '@app/components/books/books.component';
import { BookListComponent } from '@app/components/book-list/book-list.component';
import { BookDetailsComponent } from '@app/components/book-details/book-details.component';
import { BooksService } from '@app/shared/services/books.service';

@NgModule({
  imports: [
    CommonModule,
    HistoryRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  declarations: [
    HistoryComponent,
    BooksComponent,
    BookListComponent,
    BookDetailsComponent
  ],
  providers: [
      BooksService
  ]
})
export class HistoryModule { }
