import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DetailTicketComponent } from "./detail-ticket.component";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";

describe("DetailTicketComponent", () => {
  let component: DetailTicketComponent;
  let fixture: ComponentFixture<DetailTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailTicketComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
