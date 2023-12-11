import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ListTicketComponent } from "./list-ticket.component";
import { provideMockStore } from "@ngrx/store/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { TicketsService } from "src/app/services/tickets.service";
import { BackendService } from "src/app/backend.service";

describe("ListTicketComponent", () => {
  let component: ListTicketComponent;
  let fixture: ComponentFixture<ListTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTicketComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore({}), TicketsService, BackendService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
