import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActionTicket from '../../Actions/ticket/ticket.actions';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Ticket } from '../../../../interfaces/ticket.interface';
import { TicketsService } from '../../../services/tickets.service';

@Injectable()
export class TicketEffects {
  loadTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionTicket.loadTickets),
      concatMap(() =>
        this.ticketService.listTikets.pipe(
          map((tickets: string | Ticket[]) =>
            fromActionTicket.loadTicketsSuccess({ tickets })
          ),
          tap(({ tickets }) => this.ticketService.setListTicket(tickets)),
          catchError(() => {
            return of(
              fromActionTicket.loadTicketsFailure({
                error: 'Erreur de récuperation',
              })
            );
          })
        )
      )
    )
  );

  addTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionTicket.addTicket),
      concatMap(({ description }) =>
        this.ticketService.addTicket(description).pipe(
          map((ticket: string | Ticket) =>
            fromActionTicket.addTicketSuccess({ ticket })
          ),
          catchError(() => {
            return of(
              fromActionTicket.addTicketFailure({
                error: "Erreur d'Ajout ticket",
              })
            );
          })
        )
      )
    )
  );

  getOneTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionTicket.getOneTicket),
      concatMap(({ id }) =>
        this.ticketService.getTicketById(+id).pipe(
          map((ticket: string | undefined | Ticket) =>
            fromActionTicket.getOneTicketSuccess({ ticket })
          ),
          catchError(() => {
            return of(
              fromActionTicket.getOneTicketFailure({
                error: 'Erreur lors du filtre',
              })
            );
          })
        )
      )
    )
  );

  updateAssignTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionTicket.updateOneTicket),
      concatMap(({ ticketId, userId }) =>
        this.ticketService.updateTicketOnSelectUser(ticketId, userId).pipe(
          map((ticket: string | Ticket) =>
            fromActionTicket.updateOneTicketSuccess({ ticket })
          ),
          catchError((error) => {
            return of(
              fromActionTicket.updateOneTicketFailure({
                error: 'Erreur de recuperation ' + error,
              })
            );
          })
        )
      )
    )
  );

  updateCompleteTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActionTicket.updateCompleteOneTicket),
      concatMap(({ ticketId }) =>
        this.ticketService.updateTicketonComplet(ticketId).pipe(
          map((ticket: string | Ticket) =>
            fromActionTicket.updateCompleteOneTicketSuccess({ ticket })
          ),
          catchError((error: Error) => {
            return of(
              fromActionTicket.updateCompleteOneTicketFailure({
                error: 'Erreur de recuperation',
              })
            );
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ticketService: TicketsService
  ) {}
}
