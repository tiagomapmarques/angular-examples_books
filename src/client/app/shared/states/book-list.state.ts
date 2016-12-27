import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { BooksService } from '../services/index';
import { Book } from '../models/index';

@Injectable()
export class BookListState {
  private subscription: Subscription;
  private state: ReplaySubject<Book[]>;

  constructor(private booksService: BooksService) {
    this.state = new ReplaySubject(1);
    this.subscription = this.booksService.get().subscribe((books: Book[]) => {
      this.next(books);
    });
  }

  public get(): Observable<Book[]> {
    return this.state.asObservable();
  }

  public next(books: Book[]): void {
    return this.state.next(books);
  }
}
