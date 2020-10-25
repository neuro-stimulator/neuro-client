import { Component, ComponentFactoryResolver, OnInit, Type, ViewContainerRef } from '@angular/core';

import { of, Subscription } from 'rxjs';

import { DialogChildComponent, ModalComponent } from '@diplomka-frontend/stim-lib-modal';

import { PageToolsChildComponent } from './page-tools-child-component';

@Component({
  templateUrl: './page-tools.component.html',
  styleUrls: ['./page-tools.component.sass']
})
export class PageToolsComponent extends DialogChildComponent implements OnInit {
  private _viewComponent: Type<any>;
  private _pageToolsChildComponent: PageToolsChildComponent;
  private _modal: ModalComponent;

  private _confirmSubscription: Subscription;
  private _cancelSubscription: Subscription;
  private _showSubscription: Subscription;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    super();
  }

  ngOnInit() {
    this._preparePageToolsChildComponent(this._viewComponent);
    this._pageToolsChildComponent.init();

    setTimeout(() => {
      this._modal.title = this._pageToolsChildComponent.title;
      this._modal.confirmText = this._pageToolsChildComponent.confirmText;
      this._modal.cancelText = this._pageToolsChildComponent.cancelText;
    }, 1);
  }

  bind(modal: ModalComponent) {
    this._modal = modal;
    modal.confirmClose = false;
    modal.confirmDisabled = of(false);
    this._confirmSubscription = modal.confirm.subscribe(() =>
      this._handleConfirm()
    );
    this._cancelSubscription = modal.cancel.subscribe(() =>
      this._handleCancel()
    );
    this._showSubscription = modal.show.subscribe(
      (args) => (this._viewComponent = args[0])
    );
  }

  unbind(modal: ModalComponent) {
    this._modal = undefined;
    this._confirmSubscription.unsubscribe();
    this._showSubscription.unsubscribe();
    this._cancelSubscription.unsubscribe();
    this._pageToolsChildComponent.deinit();
  }

  private _preparePageToolsChildComponent(
    pageToolsChildComponentType: Type<any>
  ) {
    // Podle zadané komponenty získám její továrnu
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      pageToolsChildComponentType
    );
    // Vymažu obsah ve view containeru
    this.viewContainerRef.clear();

    // Vytvořím novou komponentu ve viewContaineru za pomoci továrny
    const component = this.viewContainerRef.createComponent(componentFactory);

    this._pageToolsChildComponent = component.instance as PageToolsChildComponent;
  }

  private _handleConfirm() {
    this._pageToolsChildComponent.confirm();
  }

  private _handleCancel() {
    this._pageToolsChildComponent.cancel();
  }
}
