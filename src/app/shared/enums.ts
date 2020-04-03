export enum Collections {
  ReadBooks = "readBooks"
}

export enum BookFormFields {
  Title = 'title',
  Author = 'author',
  Rating = 'rating'
}

export enum FormActions {
  Add = "ADD",
  Edit = "EDIT"
}

export enum BookMessages {
  SuccessAdd = "Book added!",
  ErrorAdd = "An error occured. Couldn't add this book.",
  SuccessEdit = "Book edited!",
  ErrorEdit = "An error occured. Couldn't edit this book.",
  SuccessDelete = "Book deleted!",
  ErrorDelete = "An error occured. Couldn't edit this book."
}
