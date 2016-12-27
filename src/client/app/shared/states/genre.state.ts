import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { BookListState } from './book-list.state';
import { Book } from '../models/index';

@Injectable()
export class GenreState {
  private subscription: Subscription;
  private state: ReplaySubject<string[]>;

  constructor(private bookListState: BookListState) {
    this.state = new ReplaySubject(1);
    this.subscription = this.bookListState.get().subscribe((books: Book[]) => {
      this.next(books
        .map(book => book.genre.name)
        .filter((genre, i, array) => array.indexOf(genre) === i)
      );
    });
  }

  public get(): Observable<string[]> {
    return this.state.asObservable();
  }

  public next(genres: string[]): void {
    return this.state.next(genres);
  }
}
