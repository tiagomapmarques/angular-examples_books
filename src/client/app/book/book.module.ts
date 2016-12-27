import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BookListState } from '../shared/states/index';
import { BookComponent } from './book.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [BookComponent],
  exports: [BookComponent],
  providers: [BookListState]
})
export class BookModule { }
