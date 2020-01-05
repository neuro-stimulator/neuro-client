import { Component, ComponentFactoryResolver, OnInit, Type, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationService } from './navigation.service';
import { NavigationButtonsAddonDirective } from './navigation-buttons-addon.directive';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  // Rozšíření navigace v podobě tlačítek
  @ViewChild(NavigationButtonsAddonDirective, {static: true}) buttonsAddon: NavigationButtonsAddonDirective;

  showSidebar: boolean;

  constructor(public navigation: NavigationService,
              private readonly _route: Router,
              private readonly componentFactoryResolver: ComponentFactoryResolver) {}

  private _clearButtonsAddon() {
    this.buttonsAddon.viewContainerRef.clear();
  }

  private _loadButtonsAddon(addon: Type<any>) {
    // Podle zadané komponenty získám její továrnu
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(addon);
    // Uložím si referenci na viewContainer
    const viewContainerRef = this.buttonsAddon.viewContainerRef;
    // Vymažu obsah ve viewContaineru
    viewContainerRef.clear();

    // Vytvořím novou komponentu ve viewContaineru za pomoci továrny
    viewContainerRef.createComponent(componentFactory);
  }

  ngOnInit() {
    this.showSidebar = true;

    this.navigation.navigationChange$.subscribe(data => {
      if (!data['buttonsAddon']) {
        this._clearButtonsAddon();
        return;
      }

      this._loadButtonsAddon(data['buttonsAddon']);
    });

  }
}
