import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sd-checkbox-list',
  templateUrl: 'checkbox-list.component.html',
  styleUrls: ['checkbox-list.component.css']
})

export class CheckboxListComponent {
  @Input() list: string[];
  @Output() onchange: EventEmitter<number[]>;
  private element: ElementRef;

  constructor(element: ElementRef) {
    this.list = [];
    this.onchange = new EventEmitter<number[]>();
    this.element = element;
  }

  public getChecked(): number[] {
    let checked: number[] = [];
    this.element.nativeElement.querySelectorAll('input').forEach((element: HTMLInputElement, index: number) => {
      if(element.checked) {
        checked.push(index);
      }
    });
    return checked;
  }

  public changed(): void {
    this.onchange.emit(this.getChecked());
  }
}
