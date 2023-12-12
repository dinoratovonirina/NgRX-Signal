import { Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BackendService } from './backend.service';
import { Ticket } from '../../interfaces/ticket.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private _listTicket$: BehaviorSubject<Ticket[]> = new BehaviorSubject<
    Ticket[]
  >([]);

  constructor(private readonly backendService: BackendService) {}

  get listTikets(): Observable<string | Ticket[]> {
    return this.backendService
      .tickets()
      .pipe(catchError((error) => `Erreur : ${error}`));
  }

  get listTicketBehavior() {
    return this._listTicket$;
  }

  setListTicket(arg: string | Ticket[]) {
    this._listTicket$.next(arg as Ticket[]);
  }

  getValueListTicket(): Ticket[] {
    return this._listTicket$.value;
  }

  /**
   * signal
   */

  setTicketsSignals(arg: Ticket[]) {
    this.backendService.ticketsSignals.set(arg);
  }

  /**
   * signal
   */
  getListValueTicketsSignals() {
    return this.backendService.ticketsSignals();
  }

  /**
   *  signal
   */
  getSignalListTicket() {
    return this.backendService.ticketsSignals;
  }

  addTicket(description: string) {
    return this.backendService
      .newTicket({ description: description })
      .pipe(catchError((error) => `Erreur : ${error}`));
  }

  getTicketById(arg: number) {
    return this.backendService
      .ticket(arg)
      .pipe(catchError((error) => `Erreur : ${error}`));
  }

  updateTicketonComplet(ticketId: number) {
    return this.backendService
      .complete(ticketId, true)
      .pipe(catchError((error) => `Erreur : ${error}`));
  }

  updateTicketOnSelectUser(ticketId: number, userId: number) {
    return this.backendService
      .assign(ticketId, userId)
      .pipe(catchError((error) => `Erreur : ${error}`));
  }
}
