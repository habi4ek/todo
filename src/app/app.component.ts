import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';

import { todosApiBaseUrl } from './backend.config';

interface TodoApiItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TodoItem {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatDividerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  newTodo = '';
  isAddTodoPopupOpen = false;
  todos: TodoItem[] = [];
  isLoading = false;
  errorMessage = '';

  get remainingCount(): number {
    return this.pendingTodos.length;
  }

  get pendingTodos(): TodoItem[] {
    return this.todos.filter((todo) => !todo.done);
  }

  get completedTodos(): TodoItem[] {
    return this.todos.filter((todo) => todo.done);
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  openAddTodoPopup(): void {
    this.isAddTodoPopupOpen = true;
  }

  closeAddTodoPopup(): void {
    this.isAddTodoPopupOpen = false;
  }

  loadTodos(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<TodoApiItem[]>(`${todosApiBaseUrl}/todos`).subscribe({
      next: (items) => {
        this.todos = items.map((item) => ({
          id: item.id,
          title: item.title,
          done: item.completed
        }));
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Unable to load todos. Check backend host in backend.config.ts.';
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  addTodo(): void {
    const title = this.newTodo.trim();
    if (!title) {
      return;
    }

    this.errorMessage = '';

    this.http
      .post<TodoApiItem>(`${todosApiBaseUrl}/todos`, {
        title,
        description: '',
        completed: false
      })
      .subscribe({
        next: (created) => {
          this.todos = [{ id: created.id, title: created.title, done: created.completed }, ...this.todos];
          this.newTodo = '';
          this.closeAddTodoPopup();
          this.cdr.markForCheck();
        },
        error: () => {
          this.errorMessage = 'Unable to create todo.';
          this.cdr.markForCheck();
        }
      });
  }

  toggleTodo(todo: TodoItem): void {
    const newDoneValue = !todo.done;
    this.errorMessage = '';

    this.http
      .patch<TodoApiItem>(`${todosApiBaseUrl}/todos/${todo.id}`, {
        completed: newDoneValue
      })
      .subscribe({
        next: (updated) => {
          this.todos = this.todos.map((item) =>
            item.id === updated.id
              ? {
                  ...item,
                  title: updated.title,
                  done: updated.completed
                }
              : item
          );
          this.cdr.markForCheck();
        },
        error: () => {
          this.errorMessage = 'Unable to update todo.';
          this.cdr.markForCheck();
        }
      });
  }

  removeTodo(todo: TodoItem): void {
    this.errorMessage = '';

    this.http.delete<void>(`${todosApiBaseUrl}/todos/${todo.id}`).subscribe({
      next: () => {
        this.todos = this.todos.filter((item) => item.id !== todo.id);
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Unable to delete todo.';
        this.cdr.markForCheck();
      }
    });
  }
}
