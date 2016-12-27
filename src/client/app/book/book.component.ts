import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BookListState } from '../shared/states/index';
import { Book } from '../shared/models/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-book',
  templateUrl: 'book.component.html',
  styleUrls: ['book.component.css'],
})

export class BookComponent implements OnInit {
  private book: Book;

  /**
   * Creates an instance of the HomeComponent with the injected
   * BooksService.
   *
   * @param {BooksService} booksService - The injected BooksService.
   */
  constructor(private router: Router, private route: ActivatedRoute, private bookListState: BookListState) {}

  /**
   * Get the names OnInit
   */
  public ngOnInit(): void {
    this.route.params.subscribe(params => this.findBook(params['id']));
  }

  public goToIndex(): void {
    this.router.navigate(['/']);
  }

  private findBook(id: string): void {
    this.bookListState.get().subscribe((books: Book[]) => {
      let filter = books.filter(book => book.id === id);
      if(filter.length !== 1) {
        this.goToIndex();
      } else {
        this.book = filter[0];
      }
    });
  }
}
