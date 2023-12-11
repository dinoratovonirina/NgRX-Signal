import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddTicketComponent } from "./add-ticket.component";
import { provideMockStore } from "@ngrx/store/testing";
import { TicketsService } from "src/app/services/tickets.service";
import { BackendService } from "src/app/backend.service";

describe("AddTicketComponent", () => {
  let component: AddTicketComponent;
  let fixture: ComponentFixture<AddTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTicketComponent],
      providers: [provideMockStore({}), TicketsService, BackendService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
