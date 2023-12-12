import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { listTicketSelector } from '../State/Selectors/ticket/ticket.selectors';
import { loadUserSelect } from '../State/Selectors/user/user.selectors';
import { Observable, of } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { Ticket } from '../../interfaces/ticket.interface';
import { User } from '../../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class DetailTicketResolver implements Resolve<any> {
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id: number = +route.params['id'];

    return of(id).pipe(
      mergeMap((id) =>
        this.store.pipe(select(listTicketSelector)).pipe(
          filter((tickets: Ticket[]) => {
            return tickets.length > 0;
          }),
          map(
            (ticket: Ticket[]) =>
              ticket.find((ticket: Ticket) => ticket.id === id) as Ticket
          )
        )
      ),
      mergeMap((ticket: Ticket) =>
        this.store.pipe(select(loadUserSelect)).pipe(
          filter((users: User[]) => {
            return users.length > 0;
          }),
          map((users: User[]) => {
            return {
              ...ticket,
              assigneeName: !!ticket.assigneeId
                ? users.find((user: User) => user.id == ticket.assigneeId)?.name
                : null,
            };
          })
        )
      )
    );
  }
}
