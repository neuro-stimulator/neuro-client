import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { NEVER, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

import { ResponseMessage } from 'diplomka-share';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private readonly _toaster: ToastrService,
              private readonly logger: NGXLogger) {
  }

  private _handleResponseMessage(message: ResponseMessage) {
    switch (message.type) {
      case 0: {
        this._toaster.success(message.text);
        break;
      }
      case 1: {
        this._toaster.info(message.text);
        break;
      }
      case 2: {
        this._toaster.warning(message.text);
        break;
      }
      case 3: {
        this._toaster.error(message.text);
      }
    }
  }

  /**
   * Prozkoumá každou příchozí odpověď ze serveru
   * Pokud odpověď obsahuje vlastnost 'message' v těle,
   * zobrazí se zpráva na základě informací
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
               .pipe(
                 map(response => {
                   if (response instanceof HttpResponse) {
                     if (response.body !== null) {
                       if (response.body.message) {
                         this._handleResponseMessage(response.body.message);
                       }
                     }
                   }

                   return response;
                 }),
                 catchError((response: any) => {
                   this.logger.error(response);
                   if (response instanceof HttpErrorResponse) {
                     const errorResponse = response as HttpErrorResponse;
                     if (errorResponse.error.message) {
                       this._handleResponseMessage(errorResponse.error.message);
                     }
                   }

                   return NEVER;
                 })
               );
  }

}
