import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book, BookListState, GenreState, CategoryState } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {
  /**
   * List of books to be displayed.
   */
  private books: Book[];

  /**
   * List of genres to be displayed.
   */
  private genres: string[];

  /**
   * list of categories to be displayed.
   */
  private categories: string[];

  /**
   * Title/Author filter to be applied when filtering books.
   */
  private titleFilter: string;

  /**
   * Genres indexes to be applied when filtering books.
   */
  private selectedGenres: number[];

  /**
   * Category index to be applied when filtering books.
   */
  private selectedCategory: number;

  /**
   * Number of books to be displayed per page.
   */
  private booksPerPage: number;

  /**
   * Current page to be displayed.
   */
  private pageNumber: number;

  /**
   * Creates an instance of the HomeComponent.
   *
   * @param {Router} router - The injected router from Angular2.
   * @param {BookListState} bookListState - The injected BookListState.
   * @param {GenreState} genreState - The injected GenreState.
   * @param {CategoryState} categoryState - The injected CategoryState.
   */
  constructor(
    private router: Router,
    private bookListState: BookListState,
    private genreState: GenreState,
    private categoryState: CategoryState
  ) {}

  /**
   * On component initialisation, it fetches the list of books from the BookListState,
   * the genres from the GenreState and categories from the CategoryState. It
   * also initialises all the required variables of the component.
   */
  public ngOnInit(): void {
    this.bookListState.get().subscribe(books => this.books = books);
    this.genreState.get().subscribe(genres => this.genres = genres);
    this.categoryState.get().subscribe(categories => this.categories = categories);
    this.titleFilter = '';
    this.selectedGenres = [];
    this.selectedCategory = null;
    this.booksPerPage = 16;
    this.pageNumber = 1;
  }

  /**
   * Function to be called when the titleFilter variable has changed.
   */
  public titleChanged(): void {
    this.updateBookList();
  }

  /**
   * Function to be called when the selected genres have changed.
   *
   * @param {number[]} genres - A list of currently selected genres' indexes.
   */
  public genreChanged(genres: number[]): void {
    this.selectedGenres = genres;
    this.updateBookList();
  }

  /**
   * Function to be called when the selected category has changed.
   *
   * @param {number} category - The currently selecetd category index.
   */
  public categoryChanged(category: number): void {
    this.selectedCategory = category;
    this.updateBookList();
  }

  /**
   * Determines whether a book is to be shown in the current page.
   *
   * @param {number} index - The index of a book.
   * @return {boolean}
   */
  public isWithinPagination(index: number): boolean {
    return (index >= (this.pageNumber-1) * this.booksPerPage) && (index < this.pageNumber * this.booksPerPage);
  }

  /**
   * Determines whether there is a previous page or not.
   *
   * @return {boolean}
   */
  public isPreviousPageValid(): boolean {
    return this.pageNumber > 1;
  }

  /**
   * Determines whether there is a next page or not.
   *
   * @return {boolean}
   */
  public isNextPageValid(): boolean {
    return this.books && (this.books.length / this.booksPerPage) > this.pageNumber;
  }

  /**
   * Changes the current page to the previous one.
   */
  public previousPage(): void {
    this.pageNumber--;
  }

  /**
   * Changes the current page to the next one.
   */
  public nextPage(): void {
    this.pageNumber++;
  }

  /**
   * Navigates to the book component.
   *
   * @param {Book} book - Book to be displayed in the book component.
   */
  public showBook(book: Book) {
    this.router.navigate(['book', book.id]);
  }

  /**
   * Function responsible for filtering the entire book list considering the
   * three filter variables: titleFilter, selectedGenres and selectedCategory.
   * This function updates the books variable of the component.
   */
  private updateBookList(): void {
    this.bookListState.get().subscribe((books: Book[]) => {
      this.books = books.filter(book => {
        let matchesTitleOrAuthor = this.fineSearch(book.name, this.titleFilter) || this.fineSearch(book.author.name, this.titleFilter);
        let matchesGenre = false;
        if(this.selectedGenres.length === 0) {
          matchesGenre = true;
        } else {
          this.selectedGenres.forEach((genreIndex: number) => {
            matchesGenre = matchesGenre || this.fineSearch(book.genre.name, this.genres[genreIndex]);
          });
        }
        let matchesCategory =
          (this.selectedCategory === null) ||
          this.fineSearch(book.genre.category, this.categories[this.selectedCategory], true);
        return matchesTitleOrAuthor && matchesGenre && matchesCategory;
      });
    });
  }

  /**
   * Function to compare two strings.
   *
   * @param {string} value - First string to be compared.
   * @param {string} query - Second string to be compared.
   * @param {boolean} matchStart - Whether or not to only match the start of the string
   * @return {boolean}
   */
  private fineSearch(value: string, query: string, matchStart: boolean = false): boolean {
    let index = this.trimAndLower(value).indexOf(this.trimAndLower(query));
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
