import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stim-feature-experiment-results-ghost-item-list',
  templateUrl: './experiment-results-ghost-item-list.component.html',
  styleUrls: ['./experiment-results-ghost-item-list.component.sass']
})
export class ExperimentResultsGhostItemListComponent implements OnInit {

  @Input() ghosts: [];

  constructor() { }

  ngOnInit() {
  }

}
