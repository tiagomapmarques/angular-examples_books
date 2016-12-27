import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { BookListState } from './book-list.state';
import { Book } from '../models/index';

/**
 * This class provides a state to keep a list of unique genres for the application.
 */
@Injectable()
export class GenreState {
  /**
   * Subscription used to retrieve a list of unique genres from BookListState.
   */
  private subscription: Subscription;
  /**
   * List of unique genres kept.
   */
  private state: ReplaySubject<string[]>;

  /**
   * Creates a new GenreState with the injected BookListState.
   *
   * @param {BookListState} bookListState - The injected BookListState.
   * @constructor
   */
  constructor(private bookListState: BookListState) {
    this.state = new ReplaySubject(1);
    this.subscription = this.bookListState.get().subscribe((books: Book[]) => {
      this.next(books
        .map(book => book.genre.name)
        .filter((genre, i, array) => array.indexOf(genre) === i)
      );
    });
  }

  /**
   * Get the list of g' state as an observable.
   *
   * @return {Observable}
   */
  public get(): Observable<string[]> {
    return this.state.asObservable();
  }

  /**
   * Set a new list of genres as the next state for the app.
   *
   * @param {string[]} genres - The list of unique genres.
   * @return {Observable}
   */
  public next(genres: string[]): void {
    return this.state.next(genres);
  }
}
