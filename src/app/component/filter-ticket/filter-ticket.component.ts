import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  filterTicket,
  loadTickets,
} from '../../State/Actions/ticket/ticket.actions';
import { FormsModule } from '@angular/forms';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../../interfaces/ticket.interface';
import { BackendService } from '../../services/backend.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  providers: [TicketsService],
  selector: 'app-filter-ticket',
  templateUrl: './filter-ticket.component.html',
  styleUrls: ['./filter-ticket.component.css'],
})
export class FilterTicketComponent implements OnInit {
  public critereForFindTicket: string = '';

  constructor(
    private store: Store,
    public ticketService: TicketsService,
    private backEndService: BackendService
  ) {}

  ngOnInit(): void {}

  onFilterListTicket() {
    if (!!this.critereForFindTicket) {
      this.ticketService
        .getSignalListTicket()
        .update((listCurrent) =>
          listCurrent.filter(
            (ticket: Ticket) =>
              ticket.id.toString().includes(this.critereForFindTicket) ||
              ticket.description.includes(this.critereForFindTicket)
          )
        );

      this.store.dispatch(filterTicket({ critere: this.critereForFindTicket }));
    } else {
      this.ticketService.setTicketsSignals(this.backEndService.storedTickets);
      this.store.dispatch(loadTickets());
    }
  }
}
