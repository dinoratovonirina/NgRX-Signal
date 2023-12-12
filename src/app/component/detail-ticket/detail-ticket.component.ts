import { Component, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { Ticket } from '../../../interfaces/ticket.interface';
import { User } from '../../../interfaces/user.interface';
import {
  getOneTicket,
  updateCompleteOneTicket,
  updateOneTicket,
} from '../../State/Actions/ticket/ticket.actions';
import { selectTicketSelector } from '../../State/Selectors/ticket/ticket.selectors';
import { loadUserSelect } from '../../State/Selectors/user/user.selectors';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { BackendService } from '../../services/backend.service';

@Component({
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, FormsModule],
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.css'],
})
export class DetailTicketComponent implements OnInit {
  detailTicket$!: Observable<any>;
  selectUserForAssign: number = 0;
  private _selectUserForAssign$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  listUser$!: Observable<User[]>;
  id: number = this.route.snapshot.params['id'];

  detailTicket!: Signal<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.onInitOneTicket();
  }

  ngOnInit(): void {}

  get selectUserForAssignObs(): Observable<number> {
    return this._selectUserForAssign$.asObservable();
  }

  getselectUserForAssignObsValue() {
    return this._selectUserForAssign$.value;
  }

  setSelectUserForAssign(arg: number) {
    this._selectUserForAssign$.next(arg);
  }

  onInitOneTicket() {
    this.store.dispatch(getOneTicket({ id: this.id }));

    this.route.data.subscribe((detaiTicket) => {
      if (!!detaiTicket['ticket']) {
        this.detailTicket$ = of(detaiTicket['ticket']);
      }

      this.listUser$ = this.store.pipe(select(loadUserSelect));
    });
  }

  onSelectUserForAssign() {
    if (this.selectUserForAssign) {
      this.setSelectUserForAssign(this.selectUserForAssign);

      this.store.dispatch(
        updateOneTicket({
          ticketId: +this.id,
          userId: +this.selectUserForAssign,
        })
      );

      if (confirm('Voulez-vous assigner ce ticket à cette personne?')) {
        this.detailTicket$ = this.store.pipe(select(selectTicketSelector)).pipe(
          mergeMap((ticket: Ticket) =>
            this.store.pipe(select(loadUserSelect)).pipe(
              map((users: User[]) => {
                return {
                  ...ticket,
                  assigneeId: this.selectUserForAssign,
                  assigneeName: users.find(
                    (user: User) => user.id == this.selectUserForAssign
                  )?.name,
                };
              })
            )
          )
        );
      }
    }
  }

  onComplete() {
    if (confirm('Voulez-vous fermer ce ticket?')) {
      this.store.dispatch(
        updateCompleteOneTicket({
          ticketId: +this.id,
        })
      );

      this.detailTicket$ = combineLatest([
        this.store.pipe(select(selectTicketSelector)),
        this.store.pipe(select(loadUserSelect)),
      ]).pipe(
        map(([ticket, users]) => {
          return {
            ...ticket,
            assigneeName: users.find(
              (user: User) => +user.id == ticket.assigneeId
            )?.name,
            completed: true,
          };
        })
      );
    }
  }

  onPrecede() {
    this.router.navigate(['/list-ticket']);
  }
}
