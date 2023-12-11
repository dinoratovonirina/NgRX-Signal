import { Component, OnInit, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
//import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import {
  isLoaderSelector,
  listTicketSelector,
} from '../../State/Selectors/ticket/ticket.selectors';
import { Ticket } from '../../../interfaces/ticket.interface';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';
import { FilterTicketComponent } from '../filter-ticket/filter-ticket.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, AddTicketComponent, FilterTicketComponent],
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css'],
})
export class ListTicketComponent implements OnInit {
  //tickets$!: Observable<Ticket[]>;
  //isLoader$!: Observable<boolean>;
  ticketsSignals: Signal<Ticket[] | undefined> = toSignal(
    this.store.pipe(select(listTicketSelector))
  );

  isLoaderSignal = toSignal(this.store.pipe(select(isLoaderSelector)));

  constructor(private store: Store, private route: Router) {}

  ngOnInit(): void {
    //this.iniListTicket();
  }

  iniListTicket() {
    //this.tickets$ = this.store.pipe(select(listTicketSelector));
    //this.isLoader$ = this.store.pipe(select(isLoaderSelector));
  }

  onViewDetailTicket(arg: number) {
    this.route.navigate(['detail-ticket', arg]);
  }
}
