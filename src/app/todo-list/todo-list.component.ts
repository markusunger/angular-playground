import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TodoItem } from '../app.model';
import { StatusChangeEvent } from '../app.component';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  @Input() items!: TodoItem[];
  @Output() statusChange = new EventEmitter<StatusChangeEvent>();
  @Output() itemToDelete = new EventEmitter<number>();

  changeDoneStatus(event: MatCheckboxChange) {
    this.statusChange.emit({
      id: event.source.id,
      newStatus: event.checked,
    });
  }

  deleteItem(id: number) {
    this.itemToDelete.emit(id);
  }
}
