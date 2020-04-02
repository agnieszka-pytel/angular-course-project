type Rating = 1 | 2 | 3 | 4 | 5;

export interface IReadBook {
    id: string;
    title: string;
    author: string;
    date: string;
    rating: Rating;
}
