import { Component, ComponentFactoryResolver, EventEmitter, HostListener, Input, OnDestroy, Type, ViewChild } from '@angular/core';
import { animation } from './modal.animation';

import { Observable, Subscription } from 'rxjs';

import { DialogChildsDirective } from './dialog-childs.directive';
import { DialogChildComponent } from './dialog-child.component';

/**
 * Komponenta reprezentující modální dialog
 * Dialog disponuje dvěma tlačítky: <b>zrušit</b>, <b>potvrdit</b>.
 *
 * Pracuje ve dvou módech:
 *  - read-only - pouze pro zobrazení informace
 *  - s čekáním na výsledek - předpokládá se nějaká interakce v dialogu s výsledkem
 *
 * V read-only režimu je vhodné dialog použít takto:
 *  <pre>
 *    <stim-lib-modal id="informationModalDialog" title="Informace"
 *      (confirm)="handleConfirmInformationDialog()"
 *      (cancel)="handleCnacelConfirmationDialog()">
 *      <stim-import-dialog></stim-import-dialog>
 *    </stim-lib-modal>
 *  </pre>
 *
 *  Pro čekání na výsledek je potřeba spárovat proměnnou 'result':
 *  <pre>
 *    <stim-lib-modal id="modalContainer" title="Import dotazů"
 *      [result]="importDialog.entries"
 *      (confirm)="importDialog.doImport()">
 *      <stim-import-dialog #importDialog></stim-import-dialog>
 *    </stim-lib-modal>
 *  </pre>
 *
 * V druhém případě se výsledek musí získat právě z komponenty uvnitř dialogu,
 * proto se nabinduje metoda 'confirm', která informuje komponentu v dialogu,
 * že má poskytnout výsledek do 'spárované' proměnné.
 */
@Component({
  selector: 'stim-lib-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  animations: [animation],
})
export class ModalComponent implements OnDestroy {
  // Obsah dialogu
  @ViewChild(DialogChildsDirective, { static: true }) childDirective: DialogChildsDirective;
  // Pomocná reference na odběr výsledku
  private _resultSubscription: Subscription;
  // Pomocná reference na odběr akce zrušení dialogu
  private _cancelSubscription: Subscription;
  // Instance zobrazované komponenty
  private _viewInstance: DialogChildComponent;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  // ID dialogu
  private _id: string;

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  // Titulek dialogu
  private _title: string;

  get title(): string {
    return this._title;
  }

  @Input() set title(title: string) {
    this._title = title;
  }

  // Text v potvrzovacím tlačítku
  private _confirmText = 'Použít';

  get confirmText(): string {
    return this._confirmText;
  }

  @Input() set confirmText(confirmText: string) {
    this._confirmText = confirmText;
  }

  // Text v cancel tlačítku
  private _cancelText = 'Zrušit';

  get cancelText(): string {
    return this._cancelText;
  }

  @Input() set cancelText(cancelText: string) {
    this._cancelText = cancelText;
  }

  // Pozorovatelný výsledek, který se použije v metodě openForResult
  private _result: Observable<any>;

  get result(): Observable<any> {
    return this._result;
  }

  set result(result: Observable<any>) {
    this._result = result;
  }

  // Ovládání přístupnosti cancel tlačítka
  private _cancelDisabled: boolean;

  get cancelDisabled(): boolean {
    return this._cancelDisabled;
  }

  @Input() set cancelDisabled(cancelDisabled: boolean) {
    this._cancelDisabled = cancelDisabled;
  }

  // Ovládání přístupnosti potvrzovacího tlačítka
  private _confirmDisabled: Observable<boolean>;

  get confirmDisabled(): Observable<boolean> {
    return this._confirmDisabled;
  }

  set confirmDisabled(confirmDisabled: Observable<boolean>) {
    this._confirmDisabled = confirmDisabled;
  }

  // Komponenta, která se zobrazí v dialogu
  private _showComponent: Type<DialogChildComponent>;

  get showComponent(): Type<DialogChildComponent> {
    return this._showComponent;
  }

  set showComponent(showComponent: Type<DialogChildComponent>) {
    this._showComponent = showComponent;
  }

  // Pokud se nastaví na true, musí se "někdo jiný" postarat o zavření dialogu
  private _confirmClose: boolean;

  get confirmClose(): boolean {
    return this._confirmClose;
  }

  set confirmClose(confirmClose: boolean) {
    this._confirmClose = confirmClose;
  }

  // Zavolá se při zobrazení dialogu
  private _show = new EventEmitter<any>();

  get show(): Observable<any> {
    return this._show;
  }

  // Zrušení akce v dialogu
  private _cancel = new EventEmitter<void>();

  get cancel(): Observable<any> {
    return this._cancel;
  }

  // Potvrzení akce v dialogu
  private _confirm = new EventEmitter<void>();

  get confirm(): Observable<any> {
    return this._confirm;
  }

  // Příznak, který říká, zda-li je dialog otevřený
  private _isOpen = false;

  get isOpen(): boolean {
    return this._isOpen;
  }

  ngOnDestroy(): void {
    // Teď ho odeberu z DOMu
    this._unsubscrie();
  }

  /**
   * Otevře dialog bez čekání na výsledek
   *
   * @param params Vstupní parametry
   */
  open<P>(params?: P): void {
    // Nastaví příznak na otevřeno
    this._isOpen = true;
    // Přidá třídu 'modal-open' do elementu 'body'
    document.body.classList.add('modal-open');
    // Informuji pozorovatele, že zobrazuji dialog
    this._loadDialogContent();
    this._show.emit(params);
  }

  /**
   * Otevře dialog s čekáním na výsledek
   *
   * @param params Vstupní parametry
   * @return R výstupní parametry
   */
  openForResult<P, R>(params?: P): Promise<R> {
    // Odhlásím z odběru předchozí odběratele
    this._unsubscrie();
    // Vrátím novou promise
    return new Promise<R>((resolve, reject) => {
      // Otevřu dialog
      this.open<P>(params);
      // Přihlásím se k odběru výsledku
      this._resultSubscription = this.result.subscribe((value) => {
        // Příjde-li výsledek, považuji to za úspěšné vyřešení dialogu
        resolve(value);
      });
      // Přihlásím se k odběru zrušení dialogu
      this._cancelSubscription = this.cancel.subscribe(() => {
        // Příjde-li zrušení, považuji to za zrušení celého dialogu
        reject(null);
      });
    });
  }

  /**
   * Zavře dialog
   */
  close(): void {
    this._isOpen = false;
    document.body.classList.remove('modal-open');
    if (this._viewInstance !== undefined) {
      this._viewInstance.unbind(this);
      this._viewInstance = undefined;
    }
  }

  /**
   * Reakce na tlačítko cancel
   */
  handleCancel() {
    this._cancel.emit();
    if (!this.confirmClose) {
      this.close();
    }
  }

  /**
   * Reakce na tlačítko pro potvrzení
   */
  handleConfirm() {
    this._confirm.emit();
    if (!this.confirmClose) {
      this._isOpen = false;
      document.body.classList.remove('modal-open');
    }
  }

  @HostListener('window:keyup.esc') onEscapePress() {
    this.handleCancel();
  }

  /**
   * Načte samotnou komponentu, která se v dialogu zobrazí
   */
  private _loadDialogContent() {
    // Nejdříve se ukončí životní cyklus staré komponenty
    if (this._viewInstance !== undefined) {
      this._viewInstance.unbind(this);
    }
    // Podle zadané komponenty získám její továrnu
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.showComponent);
    // Uložím si referenci na viewContainer
    const viewContainerRef = this.childDirective.viewContainerRef;
    // Vymažu obsah ve viewContaineru
    viewContainerRef.clear();

    // Vytvořím novou komponentu ve viewContaineru za pomoci továrny
    const component = viewContainerRef.createComponent(componentFactory);
    // Získám instanci této komponenty
    this._viewInstance = component.instance as DialogChildComponent;
    // Nechám komponentu inicializovat
    this._viewInstance.bind(this);
  }

  /**
   * Odhlásí z odběru subscription result a cancel události
   */
  private _unsubscrie() {
    if (this._resultSubscription) {
      this._resultSubscription.unsubscribe();
      this._resultSubscription = null;
    }
    if (this._cancelSubscription) {
      this._cancelSubscription.unsubscribe();
      this._cancelSubscription = null;
    }
  }
}
