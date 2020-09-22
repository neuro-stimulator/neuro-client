import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { FileRecord, ResponseObject } from '@stechy1/diplomka-share';

import { TOKEN_FILE_BROWSER_API_URL } from '@diplomka-frontend/stim-lib-common';

@Injectable({
  providedIn: 'root',
})
export class FileBrowserService {
  constructor(
    @Inject(TOKEN_FILE_BROWSER_API_URL) private readonly baseAPIURL: string,
    private readonly _http: HttpClient,
    private readonly logger: NGXLogger
  ) {}

  /**
   * Komparátor pro správné řazení souborů v prohlížeči souborů
   * Složky jsou na prvním místě
   *
   * @param a lhs Soubor
   * @param b rhs Soubor
   */
  readonly comparator = (a: FileRecord, b: FileRecord) => {
    if (
      (a.isDirectory && b.isDirectory) ||
      (!a.isDirectory && !b.isDirectory)
    ) {
      // @ts-ignore
      return a.name.toLowerCase() - b.name.toLowerCase();
    }

    if (a.isDirectory) {
      return -1;
    }

    if (b.isDirectory) {
      return 1;
    }

    return 0;
  };

  /**
   * Vrátí obsah pro zadanou cestu podsložek
   *
   * @param folders Pole složek, které se sloučí do výsledné cesty,
   *        pro kterou se vrátí obsah
   */
  getContent(folders: FileRecord[]): Observable<ResponseObject<FileRecord[]>> {
    const subfolders = folders.map((value: FileRecord) => value.name).join('/');
    this.logger.debug(
      `Odesílám požadavek na získání obsahu složky: '${subfolders}'`
    );
    return this._http.get<ResponseObject<FileRecord[]>>(
      `${this.baseAPIURL}/${subfolders}`
    );
  }

  /**
   * Vytvoří novou složku v datané cestě podsložek
   *
   * @param folders Pole složek, ve které se na konci vytvoří nová složka
   * @param folderName Název nové složky
   */
  createFolder(
    folders: FileRecord[],
    folderName: string
  ): Observable<ResponseObject<FileRecord[]>> {
    this.logger.info('Odesílám požadavek na vytvoření nové složky.');
    const subfolders = folders.map((value: FileRecord) => value.name).join('/');
    if (subfolders) {
      folderName = `${subfolders}/${folderName}`;
    }
    return this._http.put<ResponseObject<FileRecord[]>>(
      `${this.baseAPIURL}/${folderName}`,
      null
    );
  }

  /**
   * Nahraje zadané soubory do vybrané složky
   *
   * @param folders Pole složek, ve kterém se do poslední složky nahrají soubory
   * @param files Soubory, které se mají nahrát
   */
  upload(
    folders: FileRecord[],
    files: File[]
  ): Observable<ResponseObject<FileRecord[]>> {
    this.logger.info('Odesílám požadavek na nahrání souboru na server.');
    const subfolders = folders.map((value: FileRecord) => value.name).join('/');
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      formData.append('files[]', file, file.name);
    }

    return this._http.post<ResponseObject<FileRecord[]>>(
      `${this.baseAPIURL}/${subfolders}`,
      formData
    );
  }
  /**
   * Smaže soubor/složku z cesty
   *
   * @param folders Pole složek
   * @param file Soubor/složka, která se má smazat
   *        v případě složky se smaže rekurzivně i její obsah!
   */
  delete(
    folders: FileRecord[],
    file: FileRecord
  ): Observable<ResponseObject<FileRecord[]>> {
    this.logger.info('Odesílám požadavek na smazání souboru/složky.');
    let folderName = file.name;

    const subfolders = folders.map((value: FileRecord) => value.name).join('/');
    if (subfolders) {
      folderName = `${subfolders}/${folderName}`;
    }
    return this._http.delete<ResponseObject<FileRecord[]>>(
      `${this.baseAPIURL}/${folderName}`
    );
  }
}
