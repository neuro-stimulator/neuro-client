import { ChangeServiceEvent } from './change-service-event';
import { CRUDServiceType } from './crud-service-type';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseRecord } from './base-record';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { ResponseObject } from 'diplomka-share';
import { delay } from 'rxjs/operators';

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
                        protected readonly logger: NGXLogger) {
  }

  /**
   * Vrátí pozorovatelnou kolekci záznamů
   * Sama o sobě neinvokuje získání dat ze serveru
   */
  public get records(): Observable<T[]> {
    return this.records$;
  }

  /**
   * Získá ze serveru všechny záznamy
   */
  public all(): Promise<void> {
    return this._http.get<ResponseObject<T[]>>(this._accessPoint)
               .pipe(
                 delay(1000)
               )
               .toPromise()
               .then(response => {
                 this.records$.next(response.data);
                 return null;
               });
  }

  /**
   * Pomocí POST požadavku nahraje zadaná data na server
   *
   * @param record Záznam, který se má vložit
   * @return T Záznam, který reprezentuje data na serveru
   */
  public insert(record: T): Promise<T> {
    return this._insert(record);
  }

  /**
   * Aktualizuje záznam na serveru pomocí metody PATCH
   *
   * @param record Záznam, který se má aktualizovat
   * @return T Záznam, který reprezentuje data na serveru
   */
  public update(record: T): Promise<T> {
    return this._update(record);
  }

  /**
   * Abstraktní metoda pro vygenerování 'ghost' záznamů
   *
   * @param count Počet ghost záznamů, který se má vygenerovat
   */
  public makeGhosts(count: number = 5): Array<any> {
    return new Array(count);
  }

  /**
   * Pomocí POST požadavku nahraje zadaná data na server
   *
   * @param data Data, která se mají nahrát
   * @return T Záznam, který reprezentuje data na serveru
   */
  protected _insert(data: FormData | T): Promise<T> {
    return this._http.post<ResponseObject<T>>(this._accessPoint, data)
               .toPromise()
               .then(result => {
                 this._changeServiceEventHandler({
                   record: result.data,
                   changeType: CRUDServiceType.INSERT
                 });

                 return result.data;
               });
  }

  /**
   * Aktualizuje záznam na serveru pomocí metody PATCH
   *
   * @param data Data, která obsahují aktualizované informace záznamu
   * @return T Záznam, který reprezentuje data na serveru
   */
  protected _update(data: FormData | T): Promise<T> {
    return this._http.patch<ResponseObject<T>>(this._accessPoint, data)
               .toPromise()
               .then((result) => {
                 this._changeServiceEventHandler({
                   record: result.data,
                   changeType: CRUDServiceType.UPDATE
                 });
                 return result.data;
               });
  }

  /**
   * Smaže zadaný záznam ze serveru pomocí metody DELETE
   *
   * @param recordId ID záznamu, který se má smazat
   * @return T Záznam, který reprezentoval data na serveru
   */
  protected _delete(recordId: number): Promise<T> {
    return this._http.delete<ResponseObject<T>>(`${this._accessPoint}/${recordId}`)
               .toPromise()
               .then(result => {
                 this._changeServiceEventHandler({
                   record: result.data,
                   changeType: CRUDServiceType.DELETE
                 });
                 return result.data;
               });
  }

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
}
