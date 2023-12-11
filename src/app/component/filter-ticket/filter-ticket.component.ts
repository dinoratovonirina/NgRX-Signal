import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  filterTicket,
  loadTickets,
} from '../../State/Actions/ticket/ticket.actions';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-filter-ticket',
  templateUrl: './filter-ticket.component.html',
  styleUrls: ['./filter-ticket.component.css'],
})
export class FilterTicketComponent implements OnInit {
  public critereForFindTicket: string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onFilterListTicket() {
    if (!!this.critereForFindTicket)
      this.store.dispatch(filterTicket({ critere: this.critereForFindTicket }));
    else this.store.dispatch(loadTickets());
  }
}
