import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, Observable, Subscription } from "rxjs";

import { FileRecord } from '@stechy1/diplomka-share';

import { DialogChildComponent, ModalComponent } from '@diplomka-frontend/stim-lib-modal';
import { FileBrowserFacade, FileBrowserState } from "@diplomka-frontend/stim-feature-file-browser/domain";
import { map } from "rxjs/operators";

@Component({
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.sass']
})
export class FileBrowserComponent extends DialogChildComponent implements OnInit {

  private _selectedFileResult: EventEmitter<FileRecord> = new EventEmitter<FileRecord>();
  private _insertFileSubscription: Subscription;
  private _stateSubscription: Subscription;
  private _modal: ModalComponent;
  private _selectedFile: FileRecord;

  constructor(private readonly facade: FileBrowserFacade) {
    super();
  }

  ngOnInit(): void {
    this._stateSubscription = this.facade.fileBrowserState
        .pipe(
          map((state) => state.selectedFile)
        )
        .subscribe(value => this._selectedFile = value);
    // Vymažu dříve vybraný soubor (pro jistotu)
    this.facade.selectFile(null);
    // Získám obsah kořenové složky
    this.facade.getContent();
  }

  bind(modal: ModalComponent) {
    modal.title = 'Prohlížeč souborů';
    modal.confirmText = 'Vybrat';
    modal.confirmDisabled = this.facade.fileBrowserState.pipe(map((state) => state.selectedFile === null));
    modal.result = this._selectedFileResult;/*this.facade.fileBrowserState.pipe(map((state) => state.selectedFile));*/
    this._insertFileSubscription =  modal.confirm.subscribe(() => this.handleInsertFile());
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
      // this._service.createFolder(this.folders.getValue(), folderName)
      //     .then((files: FileRecord[]) => {
      //       this.files = files;
      //     });
    }
  }

  handleFileEntryClick(file: FileRecord) {
    this.facade.toggleFile(file);
    // Kliknu znovu na jeden a ten samý soubor
    // if (this._lastSelectedFile === file) {
    //   this._lastSelectedFile.selected = !this._lastSelectedFile.selected;
    //   this.fileForm.reset();
    //   this._formInvalid.next(!this._lastSelectedFile.selected);
    //   return;
    // }
    //
    // // Kliknul jsem na jiný, takže nejdříve odznačím předchozí
    // if (this._lastSelectedFile !== null) {
    //   this._lastSelectedFile.selected = false;
    // }
    //
    // if (file.isDirectory) {
    //   this.fileForm.reset();
    //   const folders = this.folders.getValue();
    //   folders.push(file);
    //   this.folders.next(folders);
    //   return;
    // }
    //
    // file.selected = true;
    // this._lastSelectedFile = file;
    // this.fileForm.get('blob').setValue(file);
  }

  handleDeleteFile(file: FileRecord) {
    this.facade.delete(file);
    // this._service.delete(this.folders.getValue(), file)
    //     .then((files: FileRecord[]) => {
    //       this.files = files;
    //     });
  }

  handleShowDir(folder: FileRecord = null) {
    this.facade.getContent(folder);
    // if (folder === null) {
    //   this.folders.next([]);
    //   return;
    // }
    //
    // const folders = this.folders.getValue();
    // for (let i = folders.length - 1; i >= 0; i--) {
    //   const subfolder: FileRecord = folders[i];
    //   if (subfolder.name === folder.name) {
    //     break;
    //   }
    //   folders.splice(i);
    // }
    //
    // this.folders.next(folders);
  }

  onFilesAdded(event: Event) {
    const target: HTMLInputElement = (event.target as HTMLInputElement);
    this.facade.upload(target.files);
    // this._service.upload(this.folders.getValue(), target.files)
    //     .then((files: FileRecord[]) => {
    //       this.files = files;
    //     });
  }

  private handleInsertFile() {
    this._selectedFileResult.next(this._selectedFile);
  }

  buildImagePath(path: string) {
    // return `${this._service.apiURL}/${path}`;
  }

  get state(): Observable<FileBrowserState> {
    return this.facade.fileBrowserState;
  }
}
