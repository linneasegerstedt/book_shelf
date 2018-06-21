import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input() books: Array<Book> = [];
  @Output() onBookRemoved: EventEmitter<Book> = new EventEmitter<Book>();
  clicked = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  toCheckout() {
    this.router.navigate(['/order-summary']);
  }

  removeBook(book: Book) {
    this.onBookRemoved.emit(book);
  }
}
