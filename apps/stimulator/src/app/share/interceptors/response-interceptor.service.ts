import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { NEVER, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';

import { ResponseMessage } from '@stechy1/diplomka-share';

import {
  MESSAGE_CODE_TRANSLATOR,
  SERVER_MESSAGE_CODE_PREFIX,
} from './message-code-translator';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  private readonly TOASTER_MAP: { [key: number]: (text: string) => void } = {};

  constructor(
    private readonly _toaster: ToastrService,
    private readonly translator: TranslateService,
    private readonly logger: NGXLogger
  ) {
    this.TOASTER_MAP[0] = (text: string) => _toaster.success(text);
    this.TOASTER_MAP[1] = (text: string) => _toaster.info(text);
    this.TOASTER_MAP[2] = (text: string) => _toaster.warning(text);
    this.TOASTER_MAP[3] = (text: string) => _toaster.error(text);
  }

  private static _transformMessageCodeToToasterType(
    messageCode: string
  ): number {
    return Math.min(Math.floor(+messageCode.substr(-3) / 100), 3);
  }

  private _handleResponseMessage(message: ResponseMessage) {
    const toasterMapIndex = ResponseInterceptor._transformMessageCodeToToasterType(
      `${message.code}`
    );
    this.translator
      .get(
        `${SERVER_MESSAGE_CODE_PREFIX}${MESSAGE_CODE_TRANSLATOR[message.code]}`,
        message.params
      )
      .toPromise()
      .then((value: string) => {
        if (this.TOASTER_MAP[toasterMapIndex]) {
          this.TOASTER_MAP[toasterMapIndex](value);
        } else {
          this.logger.error(value);
          this.TOASTER_MAP[3]('Neznámá chyba!');
        }
      });
  }

  /**
   * Prozkoumá každou příchozí odpověď ze serveru
   * Pokud odpověď obsahuje vlastnost 'message' v těle,
   * zobrazí se zpráva na základě informací
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((response) => {
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

        throw response;
      })
    );
  }
}
