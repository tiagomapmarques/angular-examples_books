import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sd-radio-list',
  templateUrl: 'radio-list.component.html',
  styleUrls: ['radio-list.component.css']
})

export class RadioListComponent {
  @Input() list: string[];
  @Input() altOption: string;
  @Input() default: number;
  @Output() onchange: EventEmitter<number>;
  private element: ElementRef;

  constructor(element: ElementRef) {
    this.list = [];
    this.altOption = null;
    this.default = null;
    this.onchange = new EventEmitter<number>();
    this.element = element;
  }

  public isDefault(index: number): boolean {
    return (this.default === index);
  }

  public changed(index: number): void {
    let inputName = 'alt';
    if(index !== null) {
      inputName = `${index}`;
    }
    this.enable(inputName);
    this.onchange.emit(index);
  }

  private enable(name: string): void {
    this.element.nativeElement.querySelectorAll('input').forEach((element: HTMLInputElement) => {
      element.checked = element.name === `${name}`;
    });
  }
}
