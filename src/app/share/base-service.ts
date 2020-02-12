import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { BehaviorSubject, Observable, TimeoutError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { NGXLogger } from 'ngx-logger';

import { Experiment, ResponseObject } from '@stechy1/diplomka-share';

import { environment, makeURL } from '../../environments/environment';
import { AliveCheckerService, ConnectionStatus } from '../alive-checker.service';
import { ChangeServiceEvent } from './change-service-event';
import { CRUDServiceType } from './crud-service-type';
import { BaseRecord } from './base-record';

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

  protected _socket: Socket;
  private readonly _connected: EventEmitter<any> = new EventEmitter<any>();
  public readonly connected$: Observable<any> = this._connected.asObservable();
  private readonly _disconnected: EventEmitter<any> = new EventEmitter<any>();
  public readonly disconnected$: Observable<any> = this._disconnected.asObservable();
  protected readonly _working: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly working$: Observable<boolean> = this._working.asObservable();

  protected constructor(private readonly _accessPoint: string,
                        private readonly aliveChecker: AliveCheckerService,
                        protected readonly _http: HttpClient,
                        protected readonly logger: NGXLogger) {
    aliveChecker.connectionStatus.subscribe((status: ConnectionStatus) => {
      this._handleAliveStatus(status);
    });
    aliveChecker.disconnect.subscribe(() => {
      if (this._socket !== undefined) {
        this._socket.disconnect();
      }
    });
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
  public all(): Promise<number> {
    if (this.records$.getValue().length !== 0) {
      return Promise.resolve(this.records$.getValue().length);
    }
    return this._http.get<ResponseObject<T[]>>(this._accessPoint)
               .pipe(
                 delay(1000)
               )
               .toPromise()
               .catch(error => {
                 if (error instanceof TimeoutError) {
                   return {data: []};
                 }
                 throw new Error();
               })
               .then(response => {
                 this.records$.next(response.data);
                 return response.data.length;
               })
               .catch(error => {
                 return 0;
               });
  }

  /**
   * Vrátí jeden záznam podle ID
   *
   * @param recordId ID záznamu, který se má najít
   */
  public one(recordId: number): Promise<T> {
    this._working.next(true);
    return this._http.get<ResponseObject<T>>(`${this._accessPoint}/${recordId}`)
               .toPromise()
               .then(result => {
                 if (!result.data) {
                   throw new Error();
                 }

                 return result.data;
               })
               .finally(() => {
                 this._working.next(false);
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
    this._working.next(true);
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
               })
               .finally(() => {
                 this._working.next(false);
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

  setIntroRecord(record: T): void {
    this.records$.next([record]);
  }

  clearIntroRecord(): void {
    this.records$.next([]);
  }

  protected _initSocket(namespace: string): void {
    this._socket = new Socket({url: `${makeURL(environment.url.socket, environment.port.socket)}/${namespace}`});
    this._socket.on('connect', () => this._socketConnected());
    this._socket.on('disconnect', (reason) => this._socketDisconnected(reason));
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
    this._working.next(true);
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
               })
               .finally(() => {
                 this._working.next(false);
               });
  }

  /**
   * Aktualizuje záznam na serveru pomocí metody PATCH
   *
   * @param data Data, která obsahují aktualizované informace záznamu
   * @return T Záznam, který reprezentuje data na serveru
   */
  protected _update(data: FormData | T): Promise<T> {
    this._working.next(true);
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
               })
               .finally(() => {
                 this._working.next(false);
               });
  }

  /**
   * Aktualizuje lokální kolekci dat novými daty
   *
   * @param records Nová kolekce dat
   */
  protected _replaceData(records: T[]): void {
    this.records$.next(records);
  }

  /**
   * Funkce se zavolá vždy, když je vytvořeno stálé spojení se serverem
   * Pouze informuje své pozorovatele, že k takové události došlo
   */
  protected _socketConnected() {
    this._connected.next();
  }

  /**
   * Funkce se zavolá vždy, když je spojení ztraceno
   *
   * @param reason Důvod ztráty spojení
   */
  protected _socketDisconnected(reason) {
    this._disconnected.next();
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

        this.logger.debug(`Vkládám nový záznam: ${JSON.stringify(record)}`);
        records.push(record);
        break;
      case CRUDServiceType.UPDATE:
        if (recordIndex === -1) {
          this.logger.warn(`Záznam s ID: ${record.id} nebyl nalezen!`);
          return;
        }

        this.logger.debug(`Aktualizuji záznam: ${JSON.stringify(record)}`);
        records[recordIndex] = record;
        break;
      case CRUDServiceType.DELETE:
        if (recordIndex === -1) {
          this.logger.warn(`Záznam s ID: ${record.id} nebyl nalezen!`);
          return;
        }

        this.logger.debug(`Mažu záznam: ${JSON.stringify(record)}`);
        records.splice(recordIndex, 1);
        break;
    }
    this.records$.next(records);
  }

  private _handleAliveStatus(status: ConnectionStatus) {
    if (this._socket === undefined) {
      return;
    }

    switch (status) {
      case ConnectionStatus.CONNECTED:
        this._socket.connect();
        break;
      case ConnectionStatus.CONNECTING:
        break;
      case ConnectionStatus.DISCONNECTED:
        break;
    }
  }
}
