import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { NEVER, Observable, of, throwError, TimeoutError } from 'rxjs';
import { catchError, map, tap, timeout } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class RequestTimeoutInterceptor implements HttpInterceptor {

  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number,
              private readonly _toaster: ToastrService,
              private readonly logger: NGXLogger) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
    const timeoutValueNumeric = +timeoutValue;

    return next.handle(req)
               .pipe(
                 timeout(timeoutValueNumeric),
                 catchError((error: any) => {
                   if (error instanceof TimeoutError) {
                     this.logger.info('Vypršel timeout pro požadavek.');
                     this._toaster.warning('Vypršel timeout pro požadavek.');
                   }
                   return throwError(error);
                 })
               );
  }
}
