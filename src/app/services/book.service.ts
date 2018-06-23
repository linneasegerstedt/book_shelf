import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Book } from '../models/book.model';
import { Offer } from '../models/offer.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BookService {
  books: Array<Book> = [];
  cartUpdated: Subject<Array<Book>> = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  getBooks(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>('http://henri-potier.xebia.fr/books');
  }

  getCommercialOffers(books: Array<Book>): Observable<Array<Offer>> {
    const isbnArray = [];
    books.map((book) => isbnArray.push(book.isbn));
    return this.http.get<Array<Offer>>(`http://henri-potier.xebia.fr/books/${isbnArray}/commercialOffers`);
  }
}
