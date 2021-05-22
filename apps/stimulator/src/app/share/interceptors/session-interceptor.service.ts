import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { AuthFacade } from '@diplomka-frontend/stim-feature-auth/domain';

@Injectable()
export class SessionInterceptorService implements HttpInterceptor {

  constructor(private readonly authFacade: AuthFacade) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Zajímají mě pouze GET request typy
    if (req.method !== 'GET') {
      return next.handle(req)
    }

    const httpRequest = req.clone();

    return next.handle(req).pipe(
      switchMap((response: HttpResponse<unknown>) => {
        const sessionState = response.headers ? response.headers.get('x-session-state') : undefined;
        if (sessionState === 'invalid') {
          const delayedResponse = this.authFacade.saveRequest(httpRequest);
          this.authFacade.refreshToken();
          return delayedResponse;
        }
        return of(response);
      }),
      catchError((response: HttpResponse<unknown>) => {
        const sessionState = response.headers ? response.headers.get('x-session-state') : undefined;
        if (sessionState === 'invalid') {
          const delayedResponse = this.authFacade.saveRequest(httpRequest);
          this.authFacade.refreshToken();
          return delayedResponse;
        }
       throw response;
      })
    );
  }
}
