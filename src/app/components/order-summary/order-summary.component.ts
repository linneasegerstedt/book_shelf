import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Offer } from '../../models/offer.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  books: Array<Book> = [];
  totalPrice = 0;
  offers: Array<Offer> = [];
  bestPrice = 0;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.books = this.bookService.books;
    this.getCommercialOffers(this.books);
    this.totalPrice = this.getTotalPrice(this.books);
    this.getOptimalOffer(this.totalPrice, this.offers);
  }

  getPrice() {
    return this.totalPrice;
  }

  getTotalPrice(books: Array<Book>): number {
    books.map((book) => {
      if (!book.amount) {
        this.totalPrice += Number(book.price);
      } else {
        this.totalPrice += (Number(book.price) * Number(book.amount));
      }
    });
    return this.totalPrice;
  }

  getCommercialOffers(books: Array<Book>): void{
    this.bookService.getCommercialOffers(books)
      .subscribe((res: Array<Offer>) => {
        this.offers = res['offers'];
        this.getOptimalOffer(this.totalPrice, this.offers);
      });
  }

  getOptimalOffer(price: number, offers: Array<Offer>): void {
    let reducedPrice = 0;
    this.bestPrice = price;
    offers.map((offer) => {
      switch (offer.type) {
        case 'percentage':
          reducedPrice = (100 - offer.value) / 100 * price;
          this.bestPrice = reducedPrice < this.bestPrice ? reducedPrice : this.bestPrice;
          break;
        case 'minus':
          reducedPrice = price - offer.value;
          this.bestPrice = reducedPrice < this.bestPrice ? reducedPrice : this.bestPrice;
          break;
        case 'slice':
          if (price > offer.sliceValue) {
            reducedPrice = price - offer.value;
          } else {
            reducedPrice = price;
          }
        this.bestPrice = reducedPrice < this.bestPrice ? reducedPrice : this.bestPrice;
      }
    });
  }

}
