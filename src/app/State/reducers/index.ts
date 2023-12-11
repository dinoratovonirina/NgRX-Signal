import { createReducer, MetaReducer, on } from '@ngrx/store';
import * as fromAction from '../Actions/ticket/ticket.actions';
import { Ticket } from '../../../interfaces/ticket.interface';

export const ticketFeatureKey = 'tickets';

export interface TicketState {
  readonly [ticketFeatureKey]: Ticket[];
  readonly ticket: Ticket;
  readonly isLoader: boolean;
}

export const initialeState: TicketState = {
  [ticketFeatureKey]: [],
  ticket: {} as Ticket,
  isLoader: false,
};

export const reducers = createReducer(
  initialeState,
  on(fromAction.loadTickets, (state) => {
    return {
      ...state,
      isLoader: true,
    };
  }),
  on(fromAction.loadTicketsSuccess, (state, props) => {
    return {
      ...state,
      [ticketFeatureKey]: props.tickets as Ticket[],
      isLoader: false,
    };
  }),
  on(fromAction.filterTicket, (state, props) => {
    const ticketAfterFilter: Ticket[] = state.tickets.filter(
      (ticket: Ticket) =>
        ticket.description.includes(props.critere) ||
        ticket.id.toString().includes(props.critere)
    );

    return {
      ...state,
      [ticketFeatureKey]: ticketAfterFilter,
    };
  }),
  on(fromAction.addTicketSuccess, (state, props) => {
    return {
      ...state,
      [ticketFeatureKey]: [...state.tickets, props.ticket] as Ticket[],
    };
  }),
  on(fromAction.getOneTicketSuccess, (state, props) => {
    return {
      ...state,
      ticket: props.ticket as Ticket,
    };
  }),
  on(fromAction.updateOneTicketSuccess, (state, props) => {
    const updateOneTicket: (string | Ticket)[] = state.tickets.map(
      (ticketForUpdate: Ticket) =>
        ticketForUpdate.id === (props.ticket as Ticket).id
          ? props.ticket
          : ticketForUpdate
    );

    return {
      ...state,
      ticket: props.ticket as Ticket,
      [ticketFeatureKey]: updateOneTicket as Ticket[],
    };
  }),
  on(fromAction.updateCompleteOneTicketSuccess, (state, props) => {
    const updateOneTicket: (string | Ticket)[] = state.tickets.map(
      (ticketForUpdate: Ticket) =>
        ticketForUpdate.id === (props.ticket as Ticket).id
          ? props.ticket
          : ticketForUpdate
    );
    return {
      ...state,
      ticket: props.ticket as Ticket,
      [ticketFeatureKey]: updateOneTicket as Ticket[],
    };
  })
);

export const metaReducers: MetaReducer<TicketState>[] = [];
