import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';

/**
 * This class represents shared radio list component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-radio-list',
  templateUrl: 'radio-list.component.html',
  styleUrls: ['radio-list.component.css']
})

export class RadioListComponent {
  /**
   * List of options that should be available in the radio buttons.
   */
  @Input() list: string[];
  /**
   * Alternate option for the radio buttons.
   */
  @Input() altOption: string;
  /**
   * Default option for the radio buttons.
   */
  @Input() default: number;
  /**
   * Outwards event to report a change in the component.
   */
  @Output() onchange: EventEmitter<number>;

  /**
   * Creates a new RadioListComponent with the injected ElementRef.
   *
   * @param {ElementRef} element - The injected ElementRef from Angular2.
   * @constructor
   */
  constructor(private element: ElementRef) {
    this.list = [];
    this.altOption = null;
    this.default = null;
    this.onchange = new EventEmitter<number>();
  }

  /**
   * Returns whether a checkbox is the default option.
   *
   * @return {number} index - Index of the checkbox.
   * @return {boolean}
   */
  public isDefault(index: number): boolean {
    return (this.default === index);
  }

  /**
   * Function to emit the change event to the parent component.
   * It also sets the remaining radio buttons as unchecked.
   *
   * @return {number} index - Index of the checkbox.
   * @return {boolean}
   */
  public changed(index: number): void {
    let inputName = 'alt';
    if(index !== null) {
      inputName = `${index}`;
    }
    this.enable(inputName);
    this.onchange.emit(index);
  }

  /**
   * Sets all radio buttons as unchecked except for the one given.
   *
   * @return {string} name - name of the radio button that should be checked.
   */
  private enable(name: string): void {
    this.element.nativeElement.querySelectorAll('input').forEach((element: HTMLInputElement) => {
      element.checked = element.name === `${name}`;
    });
  }
}
