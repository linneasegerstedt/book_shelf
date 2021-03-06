import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.scss']
})
export class BookShelfComponent implements OnInit {
  books: Array<Book> = [];
  booksToCart: Array<Book> = [];
  results: Array<Book> = [];
  searchPerformed = false;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe((books: Array<Book>) => {
        this.books = books;
      });
  }

  setResults($event: any) {
    this.searchPerformed = true;
    this.results = [];
    this.books.map((book) => {
      const bookRef = Object.values(book)[1].toLowerCase();
      const searchedBook = $event.search.toLowerCase();
      const bookMatch = bookRef.indexOf(searchedBook) > -1;
      if (bookMatch) {
        this.results.push(book);
        this.searchPerformed = true;
      }
    });
  }

  setBooks($event: any) {
    this.books = $event;
  }

  addToCart($event: any) {
    if (this.booksToCart.indexOf($event) > -1) {
      this.booksToCart.map((book) => {
        if (book === $event) {
          if (isNaN(book.amount)) {
            book.amount = 2;
          } else {
            book.amount += 1;
          }
        }
      });
    } else {
      this.booksToCart.push($event);
    }
    this.bookService.books = this.booksToCart;
    this.bookService.cartUpdated.next(this.booksToCart);
  }

  removeFromCart($event: any) {
    const index = this.booksToCart.indexOf($event);
    if (index > -1) {
      if (!isNaN(this.booksToCart[index].amount) && this.booksToCart[index].amount > 1) {
        this.booksToCart[index].amount = this.booksToCart[index].amount - 1;
      } else {
        this.booksToCart.splice(index, 1);
      }
      this.bookService.books = this.booksToCart;
      this.bookService.cartUpdated.next(this.booksToCart);
    }
  }

}
