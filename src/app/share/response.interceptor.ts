import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { NEVER, Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NGXLogger } from 'ngx-logger';
import { ResponseMessage } from 'diplomka-share';

export class ResponseInterceptor implements HttpInterceptor {

  constructor(private _toaster: ToastrService,
              private logger: NGXLogger) {}

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

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
               .pipe(
                 tap(response => {
                   if (response instanceof HttpResponse) {
                     if (response.body !== null) {
                       if (response.body.message) {
                         this._handleResponseMessage(response.body.message);
                       }
                     }
                   }
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
