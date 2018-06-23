import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BookService } from '../services/book.service';

@Injectable()
export class OrderGuard implements CanActivate {

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.bookService.books && this.bookService.books.length > 0) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
  }
}
