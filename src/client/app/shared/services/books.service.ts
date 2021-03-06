import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Book } from '../models/index';

/**
 * This class provides a service to retrieve the book list.
 */
@Injectable()
export class BooksService {
  /**
   * Creates a new BooksService with the injected Http.
   *
   * @param {Http} http - The injected Http from Angular2.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   *
   * @return {Book[]} The Observable for the HTTP request.
   */
  public get(): Observable<Book[]> {
    return this.http.get('/assets/books.json')
      .map((res: Response) => {
        let books = res.json();
        books.forEach((book: any) => book.published = new Date(book.published));
        return books;
      });
  }
}
