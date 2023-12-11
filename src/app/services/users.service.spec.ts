import { TestBed } from "@angular/core/testing";

import { UsersService } from "./users.service";
import { BackendService } from "../backend.service";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendService],
    });
    service = TestBed.inject(UsersService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
