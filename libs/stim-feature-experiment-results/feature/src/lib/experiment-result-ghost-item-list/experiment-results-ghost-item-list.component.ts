import { Component, Input } from '@angular/core';

@Component({
  selector: 'stim-feature-experiment-results-ghost-item-list',
  templateUrl: './experiment-results-ghost-item-list.component.html',
  styleUrls: ['./experiment-results-ghost-item-list.component.sass'],
})
export class ExperimentResultsGhostItemListComponent {
  @Input() ghosts: [];
}
