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
}
