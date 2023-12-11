import { Routes } from '@angular/router';
import { ListTicketComponent } from './component/list-ticket/list-ticket.component';
import { DetailTicketResolver } from './Resolvers/detailTicket.resolver';
import { DetailTicketComponent } from './component/detail-ticket/detail-ticket.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-ticket',
    pathMatch: 'full',
  },
  {
    path: 'list-ticket',
    component: ListTicketComponent,
  },
  {
    path: 'detail-ticket/:id',
    component: DetailTicketComponent,
    resolve: { ticket: DetailTicketResolver },
  },
];
