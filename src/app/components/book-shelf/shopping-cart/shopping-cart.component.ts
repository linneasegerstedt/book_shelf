import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../../models/book.model';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  @Input() books: Array<Book> = [];
  @Output() onBookRemoved: EventEmitter<Book> = new EventEmitter<Book>();
  clicked = false;

  constructor(
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.bookService.cartUpdated
      .subscribe((books) => {
        this.books = books;
      });
  }

  toCheckout() {
    this.router.navigate(['/order-summary']);
  }

  getTotalAmount() {
    let amount = this.books.length;
    this.books.map((book) => {
      if (book.amount) {
        amount += book.amount - 1;
      }
    });
    return amount;
  }

  removeBook(book: Book) {
    this.onBookRemoved.emit(book);
  }
}
