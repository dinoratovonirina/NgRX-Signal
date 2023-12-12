import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { Store } from '@ngrx/store';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../../interfaces/ticket.interface';
import { FormsModule } from '@angular/forms';
import { addTicket } from '../../State/Actions/ticket/ticket.actions';

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
  public nbreTicket = computed(
    () => this.ticketService.getListValueTicketsSignals().length
  );

  constructor(private store: Store, private ticketService: TicketsService) {
    effect(() => {
      console.log(
        `Insertion d'une ligne de ticket après : ${
          this.ticketService.getListValueTicketsSignals()[this.nbreTicket() - 1]
            ?.description
        }, nombre d'élément : ${this.nbreTicket()}`
      );
    });
  }

  ngOnInit(): void {}

  get description(): string {
    return this._description;
  }

  set description(arg: string) {
    this._description = arg;
    this.descriptionSignal.set(arg);
  }

  onAddTicket() {
    this.ticketService.getSignalListTicket().update(
      (listeCurrent) =>
        [
          ...listeCurrent,
          {
            id: this.nbreTicket() + 1,
            completed: false,
            assigneeId: 0,
            description: this.descriptionSignal(),
          },
        ] as Ticket[]
    );

    this.store.dispatch(addTicket({ description: this.description }));
  }
}
