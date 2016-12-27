import { Component, OnInit } from '@angular/core';
import { BookListState, GenreState, CategoryState } from '../shared/states/index';
import { Book } from '../shared/models/index';

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
  private books: Book[];
  private genres: string[];
  private categories: string[];

  private titleFilter: string;
  private selectedGenres: number[];
  private selectedCategory: number;

  private booksPerPage: number;
  private pageNumber: number;

  /**
   * Creates an instance of the HomeComponent with the injected
   * BooksService.
   *
   * @param {BooksService} booksService - The injected BooksService.
   */
  constructor(
    private bookListState: BookListState,
    private genreState: GenreState,
    private categoryState: CategoryState
  ) {}

  /**
   * Get the names OnInit
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

  public titleChanged(): void {
    this.updateBookList();
  }

  public genreChanged(genres: number[]): void {
    this.selectedGenres = genres;
    this.updateBookList();
  }

  public categoryChanged(category: number): void {
    this.selectedCategory = category;
    this.updateBookList();
  }

  public isWithinPagination(index: number) {
    return (index >= (this.pageNumber-1) * this.booksPerPage) && (index < this.pageNumber * this.booksPerPage);
  }

  public isPreviousPageValid(): boolean {
    return this.pageNumber > 1;
  }

  public isNextPageValid() {
    return this.books && (this.books.length / this.booksPerPage) > this.pageNumber;
  }

  public previousPage(): void {
    this.pageNumber--;
  }

  public nextPage(): void {
    this.pageNumber++;
  }

  private updateBookList(): void {
    this.bookListState.get().subscribe((books: Book[]) => {
      this.books = books.filter(book => {
        let matchesTitleOrAuthor = this.fineSearch(book.name, this.titleFilter);
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

  private fineSearch(value: string, query: string, matchStart: boolean = false): boolean {
    let index = this.trimAndLower(value).indexOf(this.trimAndLower(query));
    return matchStart ? index === 0 : index !== -1;
  }

  private trimAndLower(value: string): string {
    return value.replace(/[^a-zA-Z][^a-zA-Z]*/, '').toLowerCase();
  }
}
