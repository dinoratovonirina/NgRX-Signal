import { Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { isLoaderSelector } from '../../State/Selectors/ticket/ticket.selectors';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';
import { FilterTicketComponent } from '../filter-ticket/filter-ticket.component';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { TicketsService } from '../../services/tickets.service';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    JsonPipe,
    AddTicketComponent,
    FilterTicketComponent,
  ],
  providers: [TicketsService],
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css'],
})
export class ListTicketComponent implements OnInit {
  isLoaderSignal = toSignal(this.store.pipe(select(isLoaderSelector)));

  constructor(
    private store: Store,
    public ticketService: TicketsService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  onViewDetailTicket(arg: number) {
    this.route.navigate(['detail-ticket', arg]);
  }
}
