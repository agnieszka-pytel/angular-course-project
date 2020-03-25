import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

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
