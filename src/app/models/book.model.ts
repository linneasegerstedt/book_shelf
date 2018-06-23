export class Book {
  name: string;
  isbn: string;
  price: string;
  synopsis: string;
  cover: string;
  amount = 0;

  constructor(book) {
    Object.assign(this, book);
  }
}
