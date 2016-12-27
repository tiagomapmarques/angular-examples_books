import { Routes } from '@angular/router';

import { HomeRoutes } from './home/index';
import { BookRoutes } from './book/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...BookRoutes
];
