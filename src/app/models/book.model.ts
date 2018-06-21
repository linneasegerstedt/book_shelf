export class Book {
  name: string;
  isbn: string;
  price: string;

    constructor(book) {
      Object.assign(this, book);
  }
}
