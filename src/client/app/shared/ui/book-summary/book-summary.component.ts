import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/index';

@Component({
  moduleId: module.id,
  selector: 'sd-book-summary',
  templateUrl: 'book-summary.component.html',
  styleUrls: ['book-summary.component.css']
})

export class BookSummaryComponent {
  @Input() book: Book;
  @Output() click: EventEmitter<null>;

  constructor() {
    this.click = new EventEmitter<null>();
  }

  public clicked(): void {
    this.click.emit(null);
  }
}
