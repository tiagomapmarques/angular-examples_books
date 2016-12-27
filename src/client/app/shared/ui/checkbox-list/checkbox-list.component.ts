import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';

/**
 * This class represents shared checkbox list component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-checkbox-list',
  templateUrl: 'checkbox-list.component.html',
  styleUrls: ['checkbox-list.component.css']
})

export class CheckboxListComponent {
  /**
   * List of options that should be available in the checkboxes.
   */
  @Input() list: string[];
  /**
   * Outwards event to report a change in the component.
   */
  @Output() onchange: EventEmitter<number[]>;

  /**
   * Creates a new CheckboxListComponent with the injected ElementRef.
   *
   * @param {ElementRef} element - The injected ElementRef from Angular2.
   * @constructor
   */
  constructor(private element: ElementRef) {
    this.list = [];
    this.onchange = new EventEmitter<number[]>();
  }

  /**
   * Gets the list of checkboxes that are checked by index.
   *
   * @return {number[]}
   */
  public getChecked(): number[] {
    let checked: number[] = [];
    this.element.nativeElement.querySelectorAll('input').forEach((element: HTMLInputElement, index: number) => {
      if(element.checked) {
        checked.push(index);
      }
    });
    return checked;
  }

  /**
   * Function to emit the change event to the parent component.
   */
  public changed(): void {
    this.onchange.emit(this.getChecked());
  }
}
