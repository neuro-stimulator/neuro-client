import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { TranslateService } from '@ngx-translate/core';
import { AliveCheckerFacade } from '@neuro-client/stim-lib-connection';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class RequestTimeoutInterceptor implements HttpInterceptor {
  private timeoutMessage: string;

  constructor(
    @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number,
    private readonly _toaster: ToastrService,
    readonly translator: TranslateService,
    private readonly connection: AliveCheckerFacade,
    private readonly logger: NGXLogger
  ) {
    translator.onLangChange.subscribe(() => {
      translator
        .get('SHARE.INTERCEPTORS.TIMEOUT')
        .toPromise()
        .then((value: string) => {
          this.timeoutMessage = value;
        });
    });
  }

  /**
   * Každý požadavek na server bude mít vlastní timeout
   * Tím se zamezí nekonečnému čekání na odpověď ze serveru,
   * který je v době požadavku nedostupný
   */
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
    const timeoutValueNumeric = +timeoutValue;

    return next.handle(req).pipe(
      tap(() => {
        this.connection.startCommunication();
      }),
      timeout(timeoutValueNumeric),
      catchError((error: unknown) => {
        this.connection.stopCommunication();
        if (error instanceof TimeoutError) {
          this.logger.warn(`Vypršel timeout pro požadavek: ${req.urlWithParams}`);
          this._toaster.warning(this.timeoutMessage);
        }
        return throwError(error);
      }),
      tap((response) => {
        if (response instanceof HttpResponse) {
          this.connection.stopCommunication();
        }
      })
    );
  }
}
