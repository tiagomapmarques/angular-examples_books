import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/index';

/**
 * This class represents shared book summary component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-book-summary',
  templateUrl: 'book-summary.component.html',
  styleUrls: ['book-summary.component.css']
})

export class BookSummaryComponent {
  /**
   * Book to be displayed in the component.
   */
  @Input() book: Book;
  /**
   * Outwards event to report a click on the component.
   */
  @Output() click: EventEmitter<null>;

  /**
   * Creates a new BookSummaryComponent.
   *
   * @constructor
   */
  constructor() {
    this.click = new EventEmitter<null>();
  }

  /**
   * Function to emit the click event to the parent component.
   */
  public clicked(): void {
    this.click.emit(null);
  }
}
