import { Component, ComponentFactoryResolver, EventEmitter, OnDestroy, ViewChild, Type, Input } from '@angular/core';
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
 *    <app-modal id="informationModalDialog" title="Informace"
 *      (confirm)="handleConfirmInformationDialog()"
 *      (cancel)="handleCnacelConfirmationDialog()">
 *      <app-import-dialog></app-import-dialog>
 *    </app-modal>
 *  </pre>
 *
 *  Pro čekání na výsledek je potřeba spárovat proměnnou 'result':
 *  <pre>
 *    <app-modal id="modalContainer" title="Import dotazů"
 *      [result]="importDialog.entries"
 *      (confirm)="importDialog.doImport()">
 *      <app-import-dialog #importDialog></app-import-dialog>
 *    </app-modal>
 *  </pre>
 *
 * V druhém případě se výsledek musí získat právě z komponenty uvnitř dialogu,
 * proto se nabinduje metoda 'confirm', která informuje komponentu v dialogu,
 * že má poskytnout výsledek do 'spárované' proměnné.
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  animations: [
    animation
  ]
})
export class ModalComponent implements OnDestroy {

  // ID dialogu
  private _id: string;
  // Titulek dialogu
  private _title: string;
  // Text v potvrzovacím tlačítku
  private _confirmText = 'Použít';
  // Text v cancel tlačítku
  private _cancelText = 'Zrušit';
  // Pozorovatelný výsledek, který se použije v metodě openForResult
  private _result: Observable<any>;
  // Ovládání přístupnosti cancel tlačítka
  private _cancelDisabled: boolean;
  // Ovládání přístupnosti potvrzovacího tlačítka
  private _confirmDisabled: Observable<boolean>;
  // Komponenta, která se zobrazí v dialogu
  private _showComponent: Type<DialogChildComponent>;
  // Pokud se nastaví na true, musí se "někdo jiný" postarat o zavření dialogu
  private _confirmClose: boolean;
  // Zavolá se při zobrazení dialogu
  private _show = new EventEmitter<any>();
  // Zrušení akce v dialogu
  private _cancel = new EventEmitter<void>();
  // Potvrzení akce v dialogu
  private _confirm = new EventEmitter<void>();
  // Obsah dialogu
  @ViewChild(DialogChildsDirective, {static: true}) childDirective: DialogChildsDirective;

  // Pomocná reference na odběr výsledku
  private _resultSubscription: Subscription;
  // Pomocná reference na odběr akce zrušení dialogu
  private _cancelSubscription: Subscription;
  // Instance zobrazované komponenty
  private _viewInstance: DialogChildComponent;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  // Příznak, který říká, zda-li je dialog otevřený
  private _isOpen = false;

  private _loadDialogContent() {
    if (this._viewInstance !== undefined) {
      this._viewInstance.unbind(this);
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.showComponent);
    const viewContainerRef = this.childDirective.viewContainerRef;
    viewContainerRef.clear();

    const component = viewContainerRef.createComponent(componentFactory);
    this._viewInstance = (component.instance as DialogChildComponent);
    this._viewInstance.bind(this);
  }

  ngOnDestroy(): void {
    // Teď ho odeberu z DOMu
    this._unsubscrie();
  }

  /**
   * Otevře dialog bez čekání na výsledek
   */
  open(...args: any): void {
    // Nastaví příznak na otevřeno
    this._isOpen = true;
    // Přidá třídu 'modal-open' do elementu 'body'
    document.body.classList.add('modal-open');
    // Informuji pozorovatele, že zobrazuji dialog
    this._loadDialogContent();
    this._show.next(args);
  }

  /**
   * Otevře dialog s čekáním na výsledek
   */
  openForResult(...args: any): Promise<any> {
    // Odhlásím z odběru předchozí odběratele
    this._unsubscrie();
    // Vrátím novou promise
    return new Promise<any>((resolve, reject) => {
      // Otevřu dialog
      this.open(args);
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

  set id(id: string) {
    this._id = id;
  }
  get id(): string {
    return this._id;
  }
  @Input() set title(title: string) {
    this._title = title;
  }
  get title(): string {
    return this._title;
  }
  @Input() set confirmText(confirmText: string) {
    this._confirmText = confirmText;
  }
  get confirmText(): string {
    return this._confirmText;
  }
  @Input() set cancelText(cancelText: string) {
    this._cancelText = cancelText;
  }
  get cancelText(): string {
    return this._cancelText;
  }
  set result(result: Observable<any>) {
    this._result = result;
  }
  get result(): Observable<any> {
    return this._result;
  }
  @Input() set cancelDisabled(cancelDisabled: boolean) {
    this._cancelDisabled = cancelDisabled;
  }
  get cancelDisabled(): boolean {
    return this._cancelDisabled;
  }
  set confirmDisabled(confirmDisabled: Observable<boolean>) {
    this._confirmDisabled = confirmDisabled;
  }
  get confirmDisabled(): Observable<boolean> {
    return this._confirmDisabled;
  }
  set showComponent(showComponent: Type<DialogChildComponent>) {
    this._showComponent = showComponent;
  }
  get showComponent(): Type<DialogChildComponent> {
    return this._showComponent;
  }
  set confirmClose(confirmClose: boolean) {
    this._confirmClose = confirmClose;
  }
  get confirmClose(): boolean {
    return this._confirmClose;
  }
  get show(): Observable<any> {
    return this._show;
  }
  get cancel(): Observable<any> {
    return this._cancel;
  }
  get confirm(): Observable<any> {
    return this._confirm;
  }
  get isOpen(): boolean {
    return this._isOpen;
  }
}
