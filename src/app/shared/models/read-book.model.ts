import { Book } from './book.model';

type Rating = 1 | 2 | 3 | 4 | 5;

export class ReadBook extends Book {
    date: string;
    rating: Rating;
}
