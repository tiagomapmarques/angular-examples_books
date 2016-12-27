import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { BooksService } from '../services/index';
import { Book } from '../models/index';

/**
 * This class provides a state to keep a list of books for the application.
 */
@Injectable()
export class BookListState {
  /**
   * Subscription used to retrieve a list of books from BooksService.
   */
  private subscription: Subscription;
  /**
   * List of books kept.
   */
  private state: ReplaySubject<Book[]>;

  /**
   * Creates a new BookListState with the injected BooksService.
   *
   * @param {BooksService} booksService - The injected BooksService.
   * @constructor
   */
  constructor(private booksService: BooksService) {
    this.state = new ReplaySubject(1);
    this.subscription = this.booksService.get().subscribe((books: Book[]) => {
      this.next(books);
    });
  }

  /**
   * Get the list of books' state as an observable.
   *
   * @return {Observable}
   */
  public get(): Observable<Book[]> {
    return this.state.asObservable();
  }

  /**
   * Set a new list of books as the next state for the app.
   *
   * @param {Book[]} categories - The list of books.
   * @return {Observable}
   */
  public next(books: Book[]): void {
    return this.state.next(books);
  }
}
