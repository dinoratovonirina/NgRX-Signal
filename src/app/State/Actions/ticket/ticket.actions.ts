import { createAction, props } from '@ngrx/store';
import { Ticket } from '../../../../interfaces/ticket.interface';

export const loadTickets = createAction('[Ticket] Load Tickets');

export const loadTicketsSuccess = createAction(
  '[Ticket] Load Tickets Success',
  props<{ tickets: string | Ticket[] }>()
);

export const loadTicketsFailure = createAction(
  '[Ticket] Load Tickets Failure',
  props<{ error: Error | string }>()
);

/**************** filter Ticket *******************/
export const filterTicket = createAction(
  '[Ticket] filter Ticket',
  props<{ critere: string }>()
);

/**************** Add Ticket *******************/
export const addTicket = createAction(
  '[Ticket] add Ticket',
  props<{ description: string }>()
);

export const addTicketSuccess = createAction(
  '[Ticket] add Tickets Success',
  props<{ ticket: string | Ticket }>()
);

export const addTicketFailure = createAction(
  '[Ticket] add Tickets Failure',
  props<{ error: Error | string }>()
);

/**************** get one Ticket *******************/
export const getOneTicket = createAction(
  '[Ticket] get one Ticket',
  props<{ id: number }>()
);

export const getOneTicketSuccess = createAction(
  '[Ticket] get one Tickets Success',
  props<{ ticket: string | undefined | Ticket }>()
);

export const getOneTicketFailure = createAction(
  '[Ticket] get one Tickets Failure',
  props<{ error: Error | string }>()
);

/**************** update one Ticket *******************/
export const updateOneTicket = createAction(
  '[Ticket] update one Ticket',
  props<{ ticketId: number; userId: number }>()
);

export const updateOneTicketSuccess = createAction(
  '[Ticket] update one Tickets Success',
  props<{ ticket: string | Ticket }>()
);

export const updateOneTicketFailure = createAction(
  '[Ticket] update one Tickets Failure',
  props<{ error: Error | string }>()
);

/**************** update complete one Ticket *******************/
export const updateCompleteOneTicket = createAction(
  '[Ticket] update complete one Ticket',
  props<{ ticketId: number }>()
);

export const updateCompleteOneTicketSuccess = createAction(
  '[Ticket] update complete one Tickets Success',
  props<{ ticket: string | Ticket }>()
);

export const updateCompleteOneTicketFailure = createAction(
  '[Ticket] update complete one Tickets Failure',
  props<{ error: Error | string }>()
);
