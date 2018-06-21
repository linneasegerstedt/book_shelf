import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { BookShelfComponent } from './components/book-shelf/book-shelf.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { SearchComponent } from './components/book-shelf/search/search.component';
import { BookListComponent } from './components/book-shelf/book-list/book-list.component';
import { ShoppingCartComponent } from './components/book-shelf/shopping-cart/shopping-cart.component';
import { BookComponent } from './components/book-shelf/book-list/book/book.component';
import { BookService } from './services/book.service';

@NgModule({
  declarations: [
    AppComponent,
    BookShelfComponent,
    OrderSummaryComponent,
    SearchComponent,
    BookListComponent,
    ShoppingCartComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
