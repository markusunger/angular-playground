import { Component, OnInit } from '@angular/core';
import { TodoItem } from './app.model';
import { TodoService } from './todo.service';

export interface StatusChangeEvent {
  id: string;
  newStatus: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Angular Todo';
  items: TodoItem[] = [];

  constructor(private todoService: TodoService) {}

  getItems(): void {
    this.todoService.getItems().subscribe((items) => (this.items = items));
  }

  onAddItem(name: string) {
    this.todoService.addItem({ name, done: false }).subscribe((item) => {
      if (item) {
        this.items.push(item);
      }
    });
  }

  onDoneItem(event: StatusChangeEvent) {
    const eventId = parseInt(event.id, 10);
    this.todoService
      .updateItem(eventId, { done: event.newStatus })
      .subscribe((_) => {
        const item = this.items.find((i) => i.id === eventId);
        if (item) item.done = event.newStatus;
      });
  }

  onDeleteItem(id: number) {
    this.todoService.deleteItem(id).subscribe((_) => {
      this.items = this.items.filter((item) => item.id !== id);
    });
  }

  ngOnInit() {
    this.getItems();
  }
}
