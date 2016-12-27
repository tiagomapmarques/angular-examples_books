import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BooksService } from './services/index';
import { ToolbarComponent, RadioListComponent, CheckboxListComponent, BookSummaryComponent } from './ui/index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ToolbarComponent, RadioListComponent, CheckboxListComponent, BookSummaryComponent],
  exports: [ToolbarComponent, RadioListComponent, CheckboxListComponent, BookSummaryComponent,
    CommonModule, FormsModule, RouterModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [BooksService]
    };
  }
}
