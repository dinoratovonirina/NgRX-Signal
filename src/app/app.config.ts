import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers, ticketFeatureKey } from './State/reducers';
import { TicketEffects } from './State/Effects/ticket/ticket.effects';
import { BackendService } from './services/backend.service';
import { userFeatureKey, usersReducer } from './State/reducers/userReducer';
import { UserEffects } from './State/Effects/user/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore({
      [ticketFeatureKey]: reducers,
      [userFeatureKey]: usersReducer,
    }),
    provideEffects([TicketEffects, UserEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    BackendService,
  ],
};
