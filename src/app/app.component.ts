import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadTickets } from './State/Actions/ticket/ticket.actions';
import { loadUsers } from './State/Actions/user/user.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'NgRx-signals';

  constructor(private store: Store) {
    store.dispatch(loadTickets());
    store.dispatch(loadUsers());
  }
}
