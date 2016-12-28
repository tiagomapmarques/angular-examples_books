import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BookListState, Book, FilterService } from '../shared/index';

/**
 * This class represents the lazy loaded BookComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-book',
  templateUrl: 'book.component.html',
  styleUrls: ['book.component.css'],
})

export class BookComponent implements OnInit {
  /**
   * Book to be displayed in this component.
   */
  private book: Book;
  /**
   * List of recommended books.
   */
  private recommended: Book[];

  /**
   * Creates an instance of the BookComponent.
   *
   * @param {Router} router - The injected router from Angular2.
   * @param {ActivatedRoute} route - The injected navigation module from Angular2.
   * @param {BookListState} bookListState - The injected BookListState.
   * @param {FilterService} filterService - The injected FilterService.
   * @constructor
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookListState: BookListState,
    private filterService: FilterService
  ) {}

  /**
   * On component initialisation, it fetches the id on the URL to find and
   * display the book.
   */
  public ngOnInit(): void {
    this.route.params.subscribe(params => this.findBook(params['id']));
  }

  /**
   * Navigates to the root of the application.
   */
  public goToIndex(): void {
    this.router.navigate(['/']);
  }

  /**
   * Given a book id, it searches the BookListState for the correct book.
   * If the book does not exist, it will redirect the user to the root page,
   * otherwise, it will update the book variable of this component.
   *
   * @param {string} id - The id of the book to be searched.
   */
  private findBook(id: string): void {
    this.bookListState.get().subscribe((books: Book[]) => {
      let filter = books.filter(book => book.id === id);
      if(filter.length !== 1) {
        this.goToIndex();
      } else {
        this.book = filter[0];
        this.recommended = this.filterService
          .byAll(books, null, [this.book.genre.name], this.book.genre.category)
          .filter((book, index) => index < 3);
      }
    });
  }
}
