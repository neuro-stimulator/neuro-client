import { ChangeServiceEvent } from './change-service-event';
import { CRUDServiceType } from './crud-service-type';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseRecord } from './base-record';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { ResponseObject } from 'diplomka-share';
import { delay } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';

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

  private _socket: Socket;

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
   * Vrátí jeden záznam podle ID
   * Nejdříve se prohledá lokální cache, pokud záznam neexistuje
   * zavolá se dotaz na server
   *
   * @param recordId ID záznamu, který se má najít
   */
  public one(recordId: number): Promise<T> {
    const records = this.records$.getValue();
    const index = records.findIndex(record => record.id === recordId);
    if (index !== -1) {
      return new Promise(resolve => {
        resolve(records[index]);
      });
    }

    return this._http.get<ResponseObject<T>>(`${this._accessPoint}/${recordId}`)
               .toPromise()
               .then(result => {
                 return result.data;
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
   * Smaže zadaný záznam ze serveru pomocí metody DELETE
   *
   * @param recordId ID záznamu, který se má smazat
   * @return T Záznam, který reprezentoval data na serveru
   */
  public delete(recordId: number): Promise<T> {
    return this._http.delete<ResponseObject<T>>(`${this._accessPoint}/${recordId}`)
               .toPromise()
               .then(result => {
                 // Odešlu aktualizaci událost pouze, pokud nejsem připojený
                 // na websocket
                 if (this._socket === undefined) {
                   this._changeServiceEventHandler({
                     record: result.data,
                     changeType: CRUDServiceType.DELETE
                   });
                 }

                 return result.data;
               });
  }

  /**
   * Abstraktní metoda pro vygenerování 'ghost' záznamů
   *
   * @param count Počet ghost záznamů, který se má vygenerovat
   */
  public makeGhosts(count: number = 5): Array<any> {
    return new Array(count);
  }

  protected _initSocket(namespace: string): void {
    this._socket = new Socket({url: `${environment.makeURL(environment.url.socket, environment.port.socket)}/${namespace}`});
    this._socket.on('insert', (data: T) => {
      this._changeServiceEventHandler({
        record: data,
        changeType: CRUDServiceType.INSERT
      });
    });
    this._socket.on('update', (data: T) => {
      this._changeServiceEventHandler({
        record: data,
        changeType: CRUDServiceType.UPDATE
      });
    });
    this._socket.on('delete', (data: T) => {
      this._changeServiceEventHandler({
        record: data,
        changeType: CRUDServiceType.DELETE
      });
    });
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
                 // Odešlu aktualizaci událost pouze, pokud nejsem připojený
                 // na websocket
                 if (this._socket === undefined) {
                   this._changeServiceEventHandler({
                     record: result.data,
                     changeType: CRUDServiceType.INSERT
                   });
                 }

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
                 // Odešlu aktualizaci událost pouze, pokud nejsem připojený
                 // na websocket
                 if (this._socket === undefined) {
                   this._changeServiceEventHandler({
                     record: result.data,
                     changeType: CRUDServiceType.UPDATE
                   });
                 }

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
          this.logger.warn(`Záznam s ID: ${record.id} již existuje!`);
          return;
        }

        this.logger.debug('Vkládám nový záznam: ' + JSON.stringify(record));
        records.push(record);
        break;
      case CRUDServiceType.UPDATE:
        if (recordIndex === -1) {
          this.logger.warn(`Záznam s ID: ${record.id} nebyl nalezen!`);
          return;
        }

        this.logger.debug('Aktualizuji záznam: ' + JSON.stringify(record));
        records[recordIndex] = record;
        break;
      case CRUDServiceType.DELETE:
        if (recordIndex === -1) {
          this.logger.warn(`Záznam s ID: ${record.id} nebyl nalezen!`);
          return;
        }

        this.logger.debug('Mažu záznam: ' + JSON.stringify(record));
        records.splice(recordIndex, 1);
        break;
    }
    this.records$.next(records);
  }
}