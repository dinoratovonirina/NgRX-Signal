import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable } from "rxjs";

import { TicketEffects } from "./ticket.effects";
import { BackendService } from "src/app/backend.service";

describe("TicketEffects", () => {
  let actions$: Observable<any>;
  let effects: TicketEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TicketEffects,
        provideMockActions(() => actions$),
        BackendService,
      ],
    });

    effects = TestBed.inject(TicketEffects);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });
});
