import { Component, ComponentFactoryResolver, OnInit, Type, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { ModalComponent } from '@diplomka-frontend/stim-lib-modal';

import { PageToolsComponent, PageToolsArgs } from '@diplomka-frontend/stim-lib-ui';
import { AliveCheckerFacade, ConnectionInformationState } from '@diplomka-frontend/stim-lib-connection';
import { NavigationFacade, ComponentStoreService, NavigationState } from '@diplomka-frontend/stim-feature-navigation/domain';

import { NavigationButtonsAddonDirective } from './navigation-buttons-addon.directive';

@Component({
  selector: 'stim-feature-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass'],
})
export class NavigationComponent implements OnInit {
  // Rozšíření navigace v podobě tlačítek
  @ViewChild(NavigationButtonsAddonDirective, { static: true })
  buttonsAddon: NavigationButtonsAddonDirective;
  @ViewChild('modal', { static: true }) modal: ModalComponent;

  constructor(
    private readonly navigation: NavigationFacade,
    private readonly connection: AliveCheckerFacade,
    private readonly _components: ComponentStoreService,
    private readonly _route: Router,
    private readonly componentFactoryResolver: ComponentFactoryResolver
  ) {}

  private _clearButtonsAddon() {
    this.buttonsAddon.viewContainerRef.clear();
  }

  private _loadButtonsAddon(addon: Type<unknown>) {
    // Podle zadané komponenty získám její továrnu
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(addon);
    // Uložím si referenci na viewContainer
    const viewContainerRef = this.buttonsAddon.viewContainerRef;
    // Vymažu obsah ve viewContaineru
    viewContainerRef.clear();

    // Vytvořím novou komponentu ve viewContaineru za pomoci továrny
    viewContainerRef.createComponent(componentFactory); // <-- This throw error
    // ERROR TypeError: "can't define property "__NG_ELEMENT_ID__": Function is not extensible"
  }

  ngOnInit() {
    this.navigation.navigationState.subscribe((state: NavigationState) => {
      this._clearButtonsAddon();
      if (state.showAddon && this._components.addonComponent) {
        this._loadButtonsAddon(this._components.addonComponent);
      }
    });

    // this.navigation.navigationChange$.subscribe((data) => {
    //   if (!data['buttonsAddon']) {
    //     this._clearButtonsAddon();
    //     return;
    //   }
    //
    //   this._loadButtonsAddon(data['buttonsAddon']);
    // });
  }

  handleTogglePageTools() {
    this.modal.showComponent = PageToolsComponent;
    this.modal.open<PageToolsArgs>({ viewComponent: this._components.pageToolsComponent });
  }

  handleToggleSidebar() {
    this.navigation.toggleSidebarVisibility();
  }

  get navigationState(): Observable<NavigationState> {
    return this.navigation.navigationState;
  }

  get connectionState(): Observable<ConnectionInformationState> {
    return this.connection.state;
  }
}
