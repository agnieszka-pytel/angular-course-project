import { Component, OnInit } from '@angular/core';

const books = [{
    name: '',
    author: '',
    rating: '',
    
}]

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
