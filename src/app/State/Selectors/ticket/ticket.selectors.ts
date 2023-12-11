import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketState, ticketFeatureKey } from '../../reducers';

const selectTicketKey = createFeatureSelector<TicketState>(ticketFeatureKey);

export const listTicketSelector = createSelector(
  selectTicketKey,
  (ticket) => ticket[ticketFeatureKey]
);

export const selectTicketSelector = createSelector(
  selectTicketKey,
  (oneTicket) => oneTicket.ticket
);

export const isLoaderSelector = createSelector(
  selectTicketKey,
  (loader) => loader.isLoader
);
