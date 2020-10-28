import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class ClientIdInterceptorService implements HttpInterceptor {
  private static readonly KEY_CLIENT_ID = 'client-id';

  constructor(private readonly localStorage: LocalStorageService) {
    const value = localStorage.get<string>(ClientIdInterceptorService.KEY_CLIENT_ID);
    if (!value) {
      localStorage.set(ClientIdInterceptorService.KEY_CLIENT_ID, 'random-client-id');
    }
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    req = req.clone({
      setHeaders: {
        'x-client-id': this.localStorage.get<string>(ClientIdInterceptorService.KEY_CLIENT_ID),
      },
      withCredentials: true,
    });

    return next.handle(req);
  }
}
