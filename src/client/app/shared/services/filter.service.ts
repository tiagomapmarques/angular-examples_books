import { Injectable } from '@angular/core';
import { Book } from '../models/index';

/**
 * This class provides a service to filter the book list.
 */
@Injectable()
export class FilterService {
  /**
   * Function to filter a book list by title.
   *
   * @param {Book[]} books - List of books.
   * @param {string} filter - Filter to be applied.
   * @return {Book[]}
   */
  public byTitle(books: Book[], filter: string): Book[] {
    return this.byOne(books, ['name'], [filter]);
  }

  /**
   * Function to filter a book list by author.
   *
   * @param {Book[]} books - List of books.
   * @param {string} filter - Filter to be applied.
   * @return {Book[]}
   */
  public byAuthor(books: Book[], filter: string): Book[] {
    return this.byOne(books, ['author', 'name'], [filter]);
  }

  /**
   * Function to filter a book list by a list of genres.
   *
   * @param {Book[]} books - List of books.
   * @param {string[]} filters - List of genres to be applied as filters.
   * @return {Book[]}
   */
  public byGenre(books: Book[], genres: string[]): Book[] {
    return this.byOne(books, ['genre', 'name'], genres);
  }

  /**
   * Function to filter a book list by category.
   *
   * @param {Book[]} books - List of books.
   * @param {string} category - Filter to be applied.
   * @return {Book[]}
   */
  public byCategory(books: Book[], category: string): Book[] {
    return this.byOne(books, ['genre', 'category'], [category], true);
  }

  /**
   * Function to filter a book list by all parameters.
   *
   * @param {Book[]} books - List of books.
   * @param {string} titleOrAuthor - Title or author filter to be applied.
   * @param {string[]} genres - List of genres to be applied as filters.
   * @param {string} category - Category filter to be applied.
   * @return {Book[]}
   */
  public byAll(books: Book[], titleOrAuthor: string, genres: string[], category: string): Book[] {
    return books.filter(book => {
      let titleMatch = titleOrAuthor ? this.matchStrings(book.name, titleOrAuthor) : true;
      let authorMatch = titleOrAuthor ? this.matchStrings(book.author.name, titleOrAuthor) : true;
      let categoryMatch = category ? this.matchStrings(book.genre.category, category, true) : true;
      let genreMatch = !genres || genres.length === 0;
      if(genres) {
        genres.forEach(genre => {
          genreMatch = genreMatch || this.matchStrings(book.genre.name, genre);
        });
      }
      return (titleMatch || authorMatch) && genreMatch && categoryMatch;
    });
  }

  /**
   * Generic function to filter by one parameter only.
   *
   * @param {Book[]} books - List of books.
   * @param {string[]} properties - List of book keys to be applied to get to the value.
   * @param {string[]} filters - List of filters that should match the value.
   * @param {boolean} matchStart - Whether or not to only match the start of the string.
   * @return {Book[]}
   */
  private byOne(books: Book[], properties: string[], filters: string[], matchStart: boolean = false): Book[] {
    return books.filter(book => {
      let value: any = book;
      properties.forEach(property => value = value[property]);
      if(typeof value === 'string') {
        for(var i = 0; i < filters.length; ++i) {
          if(this.matchStrings(value, filters[i], matchStart)) {
            return true;
          }
        }
      }
      return false;
    });
  }

  /**
   * Function to compare two strings.
   *
   * @param {string} first - First string to be compared.
   * @param {string} second - Second string to be compared.
   * @param {boolean} matchStart - Whether or not to only match the start of the string.
   * @return {boolean}
   */
  private matchStrings(first: string, second: string, matchStart: boolean = false): boolean {
    let index = this.trimAndLower(first).indexOf(this.trimAndLower(second));
    return matchStart ? index === 0 : index !== -1;
  }

  /**
   * Function trim a string down to lower-case letters only.
   *
   * @param {string} value - String to be trimmed.
   * @return {string}
   */
  private trimAndLower(value: string): string {
    return value.replace(/[^a-zA-Z][^a-zA-Z]*/, '').toLowerCase();
  }
}
