import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent {
  @Output() itemToAdd = new EventEmitter<string>();

  name: string = '';

  addItem(): void {
    if (this.name) {
      this.itemToAdd.emit(this.name);
      this.name = '';
    }
  }

  constructor() {}
}
