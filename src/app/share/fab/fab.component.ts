import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FabListEntry } from './fab-list-entry';
import { fabAnimations } from './fab.animations';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.sass'],
  animations: [fabAnimations]
})
export class FabComponent implements OnInit {

  @Input() disabled = false;
  @Input() icon: string;
  @Input() fabButtons: FabListEntry[] = [];
  @Output() fabClick: EventEmitter<number> = new EventEmitter<number>();

  fabTogglerState = 'inactive';
  buttons: FabListEntry[] = [];

  constructor() {
  }

  ngOnInit() {
    if (this.fabButtons === undefined) {
      this.fabButtons = [];
    }
  }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  handleFabClick(id: number = -1) {
    // Kliknu na hlavní FAB
    if (id === -1) {
      // A nemám v seznamu žádné další pomocné FABy
      if (this.fabButtons.length === 0) {
        this.fabClick.next(id);
        return;
      }

      // V seznamu jsou nějaké další FABy
      this.buttons.length ? this.hideItems() : this.showItems();
      return;
    }

    // Kliknul jsem na pomocný FAB
    this.fabClick.next(id);

    // Schovám veškerá tlačítka
    this.hideItems();
  }

}
