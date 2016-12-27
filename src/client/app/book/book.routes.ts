import { Route } from '@angular/router';
import { BookComponent } from './index';

export const BookRoutes: Route[] = [
  {
    path: 'book/:id',
    component: BookComponent
  }
];
