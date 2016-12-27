import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { BookListState } from './book-list.state';
import { Book } from '../models/index';

/**
 * This class provides a state to keep a list of unique categories for the application.
 */
@Injectable()
export class CategoryState {
  /**
   * Subscription used to retrieve a list of unique categories from BookListState.
   */
  private subscription: Subscription;
  /**
   * List of unique categories kept.
   */
  private state: ReplaySubject<string[]>;

  /**
   * Creates a new CategoryState with the injected BookListState.
   *
   * @param {BookListState} bookListState - The injected BookListState.
   * @constructor
   */
  constructor(private bookListState: BookListState) {
    this.state = new ReplaySubject(1);
    this.subscription = this.bookListState.get().subscribe((books: Book[]) => {
      this.next(books
        .map(book => book.genre.category)
        .filter((genre, i, array) => array.indexOf(genre) === i)
      );
    });
  }

  /**
   * Get the list of categories' state as an observable.
   *
   * @return {Observable}
   */
  public get(): Observable<string[]> {
    return this.state.asObservable();
  }

  /**
   * Set a new list of categories as the next state for the app.
   *
   * @param {string[]} categories - The list of unique categories.
   * @return {Observable}
   */
  public next(categories: string[]): void {
    return this.state.next(categories);
  }
}
