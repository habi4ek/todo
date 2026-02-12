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
    MatToolbarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  newTodo = '';
  todos: TodoItem[] = [
    { title: 'Plan weekly sprint', done: false },
    { title: 'Review pull requests', done: true },
    { title: 'Prepare standup notes', done: false }
  ];

  get remainingCount(): number {
    return this.todos.filter((todo) => !todo.done).length;
  }

  addTodo(): void {
    const title = this.newTodo.trim();
    if (!title) {
      return;
    }

    this.todos.unshift({ title, done: false });
    this.newTodo = '';
  }

  toggleTodo(todo: TodoItem): void {
    todo.done = !todo.done;
  }

  removeTodo(index: number): void {
    this.todos.splice(index, 1);
  }
}
