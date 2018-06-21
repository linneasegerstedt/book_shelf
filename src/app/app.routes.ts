import { Routes, RouterModule  } from '@angular/router';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { BookShelfComponent } from './components/book-shelf/book-shelf.component';
// import { InformationGuard } from './core/guards/information/information.guard';


export const ROUTES: Routes = [
  {
    path: '',
    component: BookShelfComponent,
    pathMatch: 'full'
  },
  {
    path: 'order-summary',
    component: OrderSummaryComponent
    // canActivate: [CountryGuard]
  },
];
