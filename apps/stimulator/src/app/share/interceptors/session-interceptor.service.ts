import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { MessageCodes, ResponseMessage } from '@stechy1/diplomka-share';

import { AuthFacade } from '@diplomka-frontend/stim-feature-auth/domain';

@Injectable()
export class SessionInterceptorService implements HttpInterceptor {

  constructor(private readonly authFacade: AuthFacade) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap((response) => {
        if (response instanceof HttpResponse) {
          if (response.body !== null) {
            if (response.body.message) {
              this._handleResponseMessage(response.body.message);
            }
          }
        }
      })
    );
  }

  private _handleResponseMessage(message: ResponseMessage) {
    if (message.code === MessageCodes.CODE_ERROR_AUTH_UNAUTHORIZED) {
      this.authFacade.logout();
    }
  }
}
