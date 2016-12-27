import { Component, Input } from '@angular/core';
import { Book } from '../../models/index';

@Component({
  moduleId: module.id,
  selector: 'sd-book-summary',
  templateUrl: 'book-summary.component.html',
  styleUrls: ['book-summary.component.css']
})

export class BookSummaryComponent {
  @Input() book: Book;
}
