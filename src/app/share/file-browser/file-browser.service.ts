import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResponseObject, FileRecord } from 'diplomka-share';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileBrowserService {

  public static readonly BASE_API_URL = `${environment.makeURL(environment.url.server, environment.port.server)}/api/file-browser`;

  constructor(private _http: HttpClient) { }

  /**
   * Komparátor pro správné řazení souborů v prohlížeči souborů
   * Složky jsou na prvním místě
   *
   * @param a lhs Soubor
   * @param b rhs Soubor
   */
  private static comparator = (a: FileRecord, b: FileRecord) => {
    if ((a.isDirectory && b.isDirectory) || (!a.isDirectory && !b.isDirectory)) {
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
  }

  /**
   * Vrátí obsah pro zadanou cestu podsložek
   *
   * @param folders Pole složek, které se sloučí do výsledné cesty,
   *        pro kterou se vrátí obsah
   */
  async getContent(folders: FileRecord[]): Promise<FileRecord[]> {
    const subfolders = folders.map(value => value.name)
                              .join('/');
    const result = await this._http.get<ResponseObject<FileRecord[]>>(`${FileBrowserService.BASE_API_URL}/${subfolders}`)
                           .toPromise();
    return result.data.sort(FileBrowserService.comparator);
  }

  /**
   * Vytvoří novou složku v datané cestě podsložek
   *
   * @param folders Pole složek, ve které se na konci vytvoří nová složka
   * @param folderName Název nové složky
   */
  async createFolder(folders: FileRecord[], folderName: string): Promise<FileRecord[]> {
    const subfolders = folders.map(value => value.name)
                              .join('/');
    if (subfolders) {
      folderName = `${subfolders}/${folderName}`;
    }
    const result = await this._http.put<ResponseObject<FileRecord[]>>(`${FileBrowserService.BASE_API_URL}/${folderName}`, null)
                           .toPromise();
    return result.data.sort(FileBrowserService.comparator);
  }

  /**
   * Nahraje zadané soubory do vybrané složky
   *
   * @param folders Pole složek, ve kterém se do poslední složky nahrají soubory
   * @param files Soubory, které se mají nahrát
   */
  async upload(folders: FileRecord[], files: FileList): Promise<FileRecord[]> {
    const subfolders = folders.map(value => value.name)
                              .join('/');
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file: File = files.item(i);
      formData.append('files[]', file, file.name);
    }

    const result = await this._http.post<ResponseObject<FileRecord[]>>(`${FileBrowserService.BASE_API_URL}/${subfolders}`, formData)
                           .toPromise();
    return result.data.sort(FileBrowserService.comparator);
  }

  /**
   * Smaže soubor/složku z cesty
   *
   * @param folders Pole složek
   * @param file Soubor/složka, která se má smazat
   *        v případě složky se smaže rekurzivně i její obsah!
   */
  async delete(folders: FileRecord[], file: FileRecord) {
    let folderName = file.name;

    const subfolders = folders.map(value => value.name)
                              .join('/');
    if (subfolders) {
      folderName = `${subfolders}/${folderName}`;
    }
    const result = await this._http.delete<ResponseObject<FileRecord[]>>(`${FileBrowserService.BASE_API_URL}/${folderName}`)
                           .toPromise();
    return result.data.sort(FileBrowserService.comparator);
  }
}
