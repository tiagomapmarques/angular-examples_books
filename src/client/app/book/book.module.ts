import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BookComponent } from './book.component';
import { BookListState } from '../shared/states/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [BookComponent],
  exports: [BookComponent],
  providers: [BookListState]
})
export class BookModule { }
