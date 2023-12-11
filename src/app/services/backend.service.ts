import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { User } from '../../interfaces/user.interface';
import { Ticket } from '../../interfaces/ticket.interface';

/**
 * This service acts as a mock back-end.
 * It has some intentional errors that you might have to fix.
 */

function randomDelay() {
  return Math.random() * 4000;
}

@Injectable()
export class BackendService {
  public ticketsSignals = signal<Ticket[]>([]);
  public storedTickets: Ticket[] = [
    {
      id: 0,
      completed: false,
      assigneeId: 111,
      description: 'Install a monitor arm',
    },
    {
      id: 1,
      completed: false,
      assigneeId: 112,
      description: 'Move the desk to the new location',
    },
  ];

  public storedUsers: User[] = [
    { id: 111, name: 'Victor' },
    { id: 112, name: 'Le Perce' },
    { id: 113, name: 'Coco' },
  ];

  private lastId: number = 1;

  private findUserById = (id: number) =>
    this.storedUsers.find((user: User) => user.id === +id);

  private findTicketById = (id: number) =>
    this.storedTickets.find((ticket: Ticket) => ticket.id === +id);

  public tickets(): Observable<Ticket[]> {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  public setTicketsSignals() {
    this.ticketsSignals.set(this.storedTickets);
  }

  public getTicketsSignals() {
    return this.ticketsSignals();
  }

  public ticket(id: number): Observable<undefined | Ticket> {
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  }

  public users(): Observable<User[]> {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  public user(id: number): Observable<undefined | User> {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  public newTicket(payload: { description: string }): Observable<Ticket> {
    const newTicket: Ticket = {
      id: ++this.lastId,
      completed: false,
      assigneeId: 0,
      description: payload.description,
    };

    return of(newTicket).pipe(
      delay(randomDelay()),
      tap((ticket: Ticket) => {
        this.storedTickets = [...this.storedTickets, ticket];
      })
    );
  }

  public assign(ticketId: number, userId: number): Observable<Ticket> {
    const user = this.findUserById(+userId);
    const foundTicket = this.findTicketById(+ticketId);

    if (foundTicket && user) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        map((ticket: Ticket) => {
          return {
            ...ticket,
            assigneeId: +userId,
          };
        }),
        tap((ticket: Ticket) => {
          this.storedTickets = this.storedTickets.map(
            (ticket_array: Ticket) => {
              return ticket_array.id === ticket.id ? ticket : ticket_array;
            }
          );
        })
      );
    }

    return throwError(new Error('ticket or user not found'));
  }

  public complete(ticketId: number, completed: boolean): Observable<Ticket> {
    const foundTicket = this.findTicketById(+ticketId);

    if (foundTicket) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        map((ticket: Ticket) => {
          return {
            ...ticket,
            completed: true,
          };
        }),
        tap((ticket: Ticket) => {
          this.storedTickets = this.storedTickets.map(
            (ticket_array: Ticket) => {
              return ticket_array.id === ticket.id ? ticket : ticket_array;
            }
          );
        })
      );
    }

    return throwError(new Error('ticket not found'));
  }
}
