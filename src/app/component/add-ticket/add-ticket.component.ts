import { Component, OnInit, computed, signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { concatMap, map, take, tap } from 'rxjs/operators';
import { TicketsService } from '../../services/tickets.service';
import { addTicket } from '../../State/Actions/ticket/ticket.actions';
import { listTicketSelector } from '../../State/Selectors/ticket/ticket.selectors';
import { Ticket } from '../../../interfaces/ticket.interface';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css'],
})
export class AddTicketComponent implements OnInit {
  private _description: string = '';
  public descriptionSignal = signal<string>('');
  public listTicketSignals = signal<Ticket[]>([]);

  /* public listTicketSignals = toSignal<Ticket[]>(
    this.store.pipe(select(listTicketSelector))
  );*/

  constructor(private store: Store, private ticketService: TicketsService) {
    effect(() => {
      console.log(`Ajout d'une nouvelle ligne ${this.listTicketSignals()}`);
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(listTicketSelector)).subscribe((res: Ticket[]) => {
      if (!!res) this.listTicketSignals.set(res);
    });
  }

  get description(): string {
    return this._description;
  }

  set description(arg: string) {
    this._description = arg;
    this.descriptionSignal.set(arg);
  }

  onAddTicket() {
    this.listTicketSignals.update(
      (listeCurrent) =>
        [
          ...listeCurrent,
          {
            id: computed(() => this.listTicketSignals().length + 1),
            completed: false,
            assigneeId: null,
            description: this.descriptionSignal(),
          },
        ] as Ticket[]
    );

    /* of(this.description)
      .pipe(
        concatMap((description) =>
          this.store.pipe(select(listTicketSelector)).pipe(
            map((tickets: Ticket[]) => {
              return [
                ...tickets,
                {
                  id: tickets.length,
                  completed: false,
                  assigneeId: null,
                  description: description,
                },
              ] as Ticket[];
            })
          )
        ),
        take(1),
        tap((ticketList: string | Ticket[]) => {
          this.ticketService.setListTicket(ticketList);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.store.dispatch(addTicket({ description: this.description }));
          this.description = '';
        }
        (error: Error) => `Erreur lors de l'ajout ticket ${error}`;
      });*/
  }
}
