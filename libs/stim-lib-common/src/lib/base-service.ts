import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { ResponseObject } from '@stechy1/diplomka-share';

import { BaseRecord } from './base-record';

/**
 * Základní třída pro správu CRUD operací
 */
export abstract class BaseService<T extends BaseRecord> {
  protected constructor(protected readonly _accessPoint: string, protected readonly _http: HttpClient, protected readonly logger: NGXLogger) {}

  /**
   * Získá ze serveru všechny záznamy
   */
  public all(): Observable<ResponseObject<T[]>> {
    this.logger.info('Odesílám požadavek pro získání všech záznamů... ');
    return this._http.get<ResponseObject<T[]>>(this._accessPoint);
  }

  /**
   * Vrátí jeden záznam podle ID
   *
   * @param recordId ID záznamu, který se má najít
   */
  public one(recordId: number): Observable<ResponseObject<T>> {
    this.logger.info(`Odesílám požadavek pro získání jednoho záznamu s ID: ${recordId}...`);
    return this._http.get<ResponseObject<T>>(`${this._accessPoint}/${recordId}`);
  }

  /**
   * Pomocí POST požadavku nahraje zadaná data na server
   *
   * @param record Záznam, který se má vložit
   * @return T Záznam, který reprezentuje data na serveru
   */
  public insert(record: T): Observable<ResponseObject<T>> {
    return this._insert(record);
  }

  /**
   * Aktualizuje záznam na serveru pomocí metody PATCH
   *
   * @param record Záznam, který se má aktualizovat
   * @return T Záznam, který reprezentuje data na serveru
   */
  public update(record: T): Observable<ResponseObject<T>> {
    return this._update(record);
  }

  /**
   * Smaže zadaný záznam ze serveru pomocí metody DELETE
   *
   * @param recordId ID záznamu, který se má smazat
   * @return T Záznam, který reprezentoval data na serveru
   */
  public delete(recordId: number): Observable<ResponseObject<T>> {
    return this._http.delete<ResponseObject<T>>(`${this._accessPoint}/${recordId}`);
  }

  /**
   * Abstraktní metoda pro vygenerování 'ghost' záznamů
   *
   * @param count Počet ghost záznamů, který se má vygenerovat
   */
  public makeGhosts(count: number = 5): T[] {
    return new Array<T>(count);
  }

  /**
   * Metoda přepíše veškeré aktuální záznamy za nové
   * Používat pouze pro účely testování!
   *
   * @param records New records
   */
  public replaceData(records: T[]): void {
    this._replaceData(records);
  }

  setIntroRecord(record: T): void {
    // this._records$.next([record]);
  }

  clearIntroRecord(): void {
    // this._records$.next([]);
  }

  /**
   * Pomocí POST požadavku nahraje zadaná data na server
   *
   * @param data Data, která se mají nahrát
   * @return T Záznam, který reprezentuje data na serveru
   */
  protected _insert(data: FormData | T): Observable<ResponseObject<T>> {
    this.logger.info('Odesílám požadavek s vložením nového záznamu...');
    return this._http.post<ResponseObject<T>>(this._accessPoint, data);
  }

  /**
   * Aktualizuje záznam na serveru pomocí metody PATCH
   *
   * @param data Data, která obsahují aktualizované informace záznamu
   * @return T Záznam, který reprezentuje data na serveru
   */
  protected _update(data: FormData | T): Observable<ResponseObject<T>> {
    this.logger.info('Odesílám požadavek s aktualizací existujícího záznamu...');
    return this._http.patch<ResponseObject<T>>(this._accessPoint, data);
  }

  /**
   * Aktualizuje lokální kolekci dat novými daty
   *
   * @param records Nová kolekce dat
   */
  protected _replaceData(records: T[]): void {
    // this._records$.next(records);
  }
}
