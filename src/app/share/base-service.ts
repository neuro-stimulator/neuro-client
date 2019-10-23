import { ChangeServiceEvent } from './change-service-event';
import { CRUDServiceType } from './crud-service-type';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseRecord } from './base-record';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

export abstract class BaseService<T extends BaseRecord> {

  private readonly records$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  protected constructor(private readonly _accessPoint: string,
                        protected readonly _http: HttpClient,
                        protected readonly logger: NGXLogger) { }

  private _changeServiceEventHandler(event: ChangeServiceEvent<T>) {
    if (event === null) {
      return;
    }

    const record = event.record;
    const records = this.records$.getValue();
    const recordIndex = records.findIndex(value => value.id === record.id);
    switch (event.changeType) {
      case CRUDServiceType.INSERT:
        if (recordIndex !== -1) {
          this.logger.error(`Záznam s ID: ${recordIndex} již existuje!`);
          return;
        }

        records.push(record);
        break;
      case CRUDServiceType.UPDATE:
        if (recordIndex === -1) {
          this.logger.error(`Záznam s ID: ${recordIndex} nebyl nalezen!`);
          return;
        }

        records[recordIndex] = record;
        break;
      case CRUDServiceType.DELETE:
        if (recordIndex === -1) {
          this.logger.error(`Záznam s ID: ${recordIndex} nebyl nalezen!`);
          return;
        }

        records.splice(recordIndex, 1);
        break;
    }
    this.records$.next(records);
  }

  all(): void {
    this._http.get<{records: T[]}>(this._accessPoint)
        .toPromise()
        .then(response => {
          this.records$.next(response.records);
        });
  }

  protected _insert(formData: FormData): Promise<T> {
    return this._http.post<{record: T}>(this._accessPoint, formData)
               .toPromise()
               .then(result => {
                 this._changeServiceEventHandler({
                   record: result.record,
                   changeType: CRUDServiceType.INSERT
                 });

                 return result.record;
               });
  }

  protected _update(formData: FormData): Promise<T> {
    return this._http.post<{record: T}>(this._accessPoint, formData)
               .toPromise()
               .then((result) => {
                 this._changeServiceEventHandler({
                   record: result.record,
                   changeType: CRUDServiceType.UPDATE
                 });
                 return result.record;
               });
  }

  protected _delete(recordId: number): Promise<T> {
    return this._http.delete<{record: T}>(`${this._accessPoint}/${recordId}`)
               .toPromise()
               .then(result => {
                 this._changeServiceEventHandler({
                   record: result.record,
                   changeType: CRUDServiceType.DELETE
                 });
                 return result.record;
               });
  }

  get records(): Observable<T[]> {
    return this.records$;
  }
}
