import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent implements OnInit {

  myForm: FormGroup;
  ratingValues: number[] = [1,2,3,4,5];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
      this.myForm = this.fb.group({
          title: '',
          author: '',
          rating: '',
      });

      this.myForm.valueChanges.subscribe(console.log);
  }

}
