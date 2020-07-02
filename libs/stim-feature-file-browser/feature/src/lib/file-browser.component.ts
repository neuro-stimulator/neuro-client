import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { FileRecord } from '@stechy1/diplomka-share';

import {
  DialogChildComponent,
  ModalComponent,
} from '@diplomka-frontend/stim-lib-modal';
import {
  FileBrowserFacade,
  FileBrowserState,
} from '@diplomka-frontend/stim-feature-file-browser/domain';
import { map } from 'rxjs/operators';
import { TOKEN_FILE_BROWSER_API_URL } from '@diplomka-frontend/stim-lib-common';

@Component({
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.sass'],
})
export class FileBrowserComponent extends DialogChildComponent
  implements OnInit {
  private _selectedFileResult: EventEmitter<FileRecord> = new EventEmitter<
    FileRecord
  >();
  private _insertFileSubscription: Subscription;
  private _stateSubscription: Subscription;
  private _modal: ModalComponent;
  private _selectedFile: FileRecord;

  constructor(
    @Inject(TOKEN_FILE_BROWSER_API_URL) private readonly apiURL: string,
    private readonly facade: FileBrowserFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this._stateSubscription = this.facade.fileBrowserState
      .pipe(map((state) => state.selectedFile))
      .subscribe((value) => (this._selectedFile = value));
    // Vymažu dříve vybraný soubor (pro jistotu)
    this.facade.selectFile(null);
    // Získám obsah kořenové složky
    this.facade.getContent();
  }

  bind(modal: ModalComponent) {
    modal.title = 'Prohlížeč souborů';
    modal.confirmText = 'Vybrat';
    modal.confirmDisabled = this.facade.fileBrowserState.pipe(
      map((state) => state.selectedFile === null)
    );
    modal.result = this._selectedFileResult;
    this._insertFileSubscription = modal.confirm.subscribe(() =>
      this.handleInsertFile()
    );
    this._modal = modal;
  }

  unbind(modal: ModalComponent) {
    this._insertFileSubscription.unsubscribe();
    this._stateSubscription.unsubscribe();
  }

  handleCreateFolder() {
    const folderName = prompt('Zadejte název složky', 'nová složka');
    if (folderName && folderName.length > 0) {
      this.facade.createFolder(folderName);
    }
  }

  handleFileEntryClick(file: FileRecord) {
    if (file.isDirectory) {
      this.facade.getContent(file);
    } else {
      this.facade.toggleFile(file);
    }
  }

  handleDeleteFile(file: FileRecord) {
    this.facade.delete(file);
  }

  handleShowDir(folder: FileRecord = null) {
    this.facade.getContent(folder);
  }

  onFilesAdded(event: Event) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const files: File[] = [];
    for (let i = 0; i < target.files.length; i++) {
      files.push(target.files.item(i));
    }
    this.facade.upload(files);
  }

  private handleInsertFile() {
    this._selectedFileResult.next(this._selectedFile);
  }

  buildImagePath(path: string) {
    return `${this.apiURL}/${path}`;
  }

  get state(): Observable<FileBrowserState> {
    return this.facade.fileBrowserState;
  }
}
