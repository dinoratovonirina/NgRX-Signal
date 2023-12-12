import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly backendService: BackendService) {}

  get listUsers(): Observable<User[]> {
    return this.backendService.users();
  }

  /**
   * signal
   */
  get listUserValueSignals() {
    return this.backendService.usersSignals();
  }

  /**
   * signal
   */
  setListUserValueSignals(arg: User[]) {
    this.backendService.usersSignals.set(arg);
  }

  /**
   * signal
   */
  get listUsersSignals() {
    return this.backendService.usersSignals;
  }
}
