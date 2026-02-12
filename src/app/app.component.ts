import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';

interface TodoItem {
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
export class AppComponent {
  newTodo = '';
  isAddTodoPopupOpen = false;
  todos: TodoItem[] = [
    { title: 'Plan weekly sprint', done: false },
    { title: 'Review pull requests', done: true },
    { title: 'Prepare standup notes', done: false }
  ];

  get remainingCount(): number {
    return this.pendingTodos.length;
  }

  get pendingTodos(): TodoItem[] {
    return this.todos.filter((todo) => !todo.done);
  }

  get completedTodos(): TodoItem[] {
    return this.todos.filter((todo) => todo.done);
  }

  openAddTodoPopup(): void {
    this.isAddTodoPopupOpen = true;
  }

  closeAddTodoPopup(): void {
    this.isAddTodoPopupOpen = false;
  }

  addTodo(): void {
    const title = this.newTodo.trim();
    if (!title) {
      return;
    }

    this.todos.unshift({ title, done: false });
    this.newTodo = '';
    this.closeAddTodoPopup();
  }

  toggleTodo(todo: TodoItem): void {
    todo.done = !todo.done;
  }

  removeTodo(todo: TodoItem): void {
    const shouldDelete = window.confirm(`Delete "${todo.title}"? This action cannot be undone.`);
    if (!shouldDelete) {
      return;
    }

    const index = this.todos.indexOf(todo);
    if (index >= 0) {
      this.todos.splice(index, 1);
    }
  }
}
