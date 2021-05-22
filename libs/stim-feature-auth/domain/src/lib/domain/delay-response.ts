import { EventEmitter } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export class DelayResponse {

  private emmiter = new EventEmitter<HttpResponse<unknown>>();

  public emit(response: HttpResponse<unknown>) {
    this.emmiter.emit(response);
  }

  public get response(): Observable<HttpResponse<unknown>> {
    return this.emmiter as Observable<HttpResponse<unknown>>;
  }
}
