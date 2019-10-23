import { ChangeServiceEvent } from './change-service-event';
import { CRUDServiceType } from './crud-service-type';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseRecord } from './base-record';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

/**
 * Základní třída pro správu CRUD operací
 */
export abstract class BaseService<T extends BaseRecord> {

  /**
   * Kolekce záznamů
   * Třída BehaviorSubject je pozorovatelná, takže lze reagovat
   * na změny v kolekci
   */
  private readonly records$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  protected constructor(private readonly _accessPoint: string,
                        protected readonly _http: HttpClient,
                        protected readonly logger: NGXLogger) { }

  /**
   * Základní CRUD handler na jednotlivá volání CRUD
   *
   * @param event Událost, na kterou se má reagovat
   */
  private _changeServiceEventHandler(event: ChangeServiceEvent<T>): void {
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

        this.logger.debug('Vkládám nový záznam: ' + JSON.stringify(record));
        records.push(record);
        break;
      case CRUDServiceType.UPDATE:
        if (recordIndex === -1) {
          this.logger.error(`Záznam s ID: ${recordIndex} nebyl nalezen!`);
          return;
        }

        this.logger.debug('Aktualizuji záznam: ' + JSON.stringify(record));
        records[recordIndex] = record;
        break;
      case CRUDServiceType.DELETE:
        if (recordIndex === -1) {
          this.logger.error(`Záznam s ID: ${recordIndex} nebyl nalezen!`);
          return;
        }

        this.logger.debug('Mažu záznam: ' + JSON.stringify(record));
        records.splice(recordIndex, 1);
        break;
    }
    this.records$.next(records);
  }

  /**
   * Získá ze serveru všechny záznamy
   */
  all(): void {
    this._http.get<{records: T[]}>(this._accessPoint)
        .toPromise()
        .then(response => {
          this.records$.next(response.records);
        });
  }

  /**
   * Pomocí POST požadavku nahraje zadaná data na server
   *
   * @param formData Data, která se mají nahrát
   * @return T Záznam, který reprezentuje data na serveru
   */
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

  /**
   * Aktualizuje záznam na serveru pomocí metody PATCH
   *
   * @param formData Data, která obsahují aktualizované informace záznamu
   * @return T Záznam, který reprezentuje data na serveru
   */
  protected _update(formData: FormData): Promise<T> {
    return this._http.patch<{record: T}>(this._accessPoint, formData)
               .toPromise()
               .then((result) => {
                 this._changeServiceEventHandler({
                   record: result.record,
                   changeType: CRUDServiceType.UPDATE
                 });
                 return result.record;
               });
  }

  /**
   * Smaže zadaný záznam ze serveru pomocí metody DELETE
   *
   * @param recordId ID záznamu, který se má smazat
   * @return T Záznam, který reprezentoval data na serveru
   */
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

  /**
   * Vrátí pozorovatelnou kolekci záznamů
   * Sama o sobě neinvokuje získání dat ze serveru
   */
  get records(): Observable<T[]> {
    return this.records$;
  }
}
