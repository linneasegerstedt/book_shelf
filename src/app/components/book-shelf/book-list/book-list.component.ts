import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../../models/book.model';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookList: Array<Book> = [];
  @Output() onBooksReceived: EventEmitter<any> = new EventEmitter<any>();
  @Output() addToCart: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeFromCart: EventEmitter<any> = new EventEmitter<any>();
  @Input() filteredBooks: Array<Book> = [];
  @Input() searchPerformed = false;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.bookList = this.getBooks();
  }

  getBooks(): Array<Book> {
    this.bookService.getBooks()
      // .skipWhile(books => books == null)
      .subscribe((books: Array<Book>) => {
        this.bookList = books;
        this.onBooksReceived.emit(this.bookList);
      });
    return this.bookList;
  }

  addBook(book: Book): void {
    this.addToCart.emit(book);
  }

  removeBook(book: Book): void {
    this.removeFromCart.emit(book);
  }

}
