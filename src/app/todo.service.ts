import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { TodoItem } from './app.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private itemsPath = `${environment.apiUrl}/items`;

  constructor(private http: HttpClient) {}

  private handleError<T>(failedResult?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(failedResult as T);
    };
  }

  getItems(): Observable<TodoItem[]> {
    return this.http
      .get<TodoItem[]>(this.itemsPath)
      .pipe(catchError(this.handleError<TodoItem[]>([])));
  }

  addItem(item: Omit<TodoItem, 'id'>): Observable<TodoItem | undefined> {
    return this.http
      .post<TodoItem>(
        this.itemsPath,
        { ...item },
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      .pipe(catchError(this.handleError<TodoItem>(undefined)));
  }

  updateItem(id: number, item: Partial<TodoItem>): Observable<any> {
    return this.http
      .put(`${this.itemsPath}/${id}`, item, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .pipe(catchError(this.handleError(undefined)));
  }

  deleteItem(id: number): Observable<any> {
    return this.http
      .delete(`${this.itemsPath}/${id}`)
      .pipe(catchError(this.handleError(undefined)));
  }
}
