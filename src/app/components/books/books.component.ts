import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { BooksService } from '@app/shared/services/books.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent implements OnInit {

    ratingValues: number[] = [1,2,3,4,5];  
    myForm: FormGroup;

    constructor(private fb: FormBuilder, private booksService:BooksService){
    }

    onSubmit(){
        let data = this.myForm.value;
        this.booksService.addReadBook(data);
    }

    ngOnInit(){
        this.myForm = this.fb.group({
            title: '',
            author: '',
            rating: '',
        });
  
        this.myForm.valueChanges
            .pipe(
                debounceTime(500))
            .subscribe(console.log);
    }

}
