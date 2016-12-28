import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { BookListState, GenreState, CategoryState, FilterService } from '../shared/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [BookListState, GenreState, CategoryState, FilterService]
})
export class HomeModule { }
