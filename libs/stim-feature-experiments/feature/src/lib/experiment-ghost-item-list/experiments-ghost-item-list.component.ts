import { Component, Input } from '@angular/core';

@Component({
  selector: 'stim-feature-experiments-ghost-item-list',
  templateUrl: './experiments-ghost-item-list.component.html',
  styleUrls: ['./experiment-ghost-item-list.component.sass'],
})
export class ExperimentsGhostItemListComponent {
  @Input() ghosts: [];
}
