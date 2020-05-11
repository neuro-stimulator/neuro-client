import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stim-experiment-result-ghost-item-list',
  templateUrl: './experiment-result-ghost-item-list.component.html',
  styleUrls: ['./experiment-result-ghost-item-list.component.sass']
})
export class ExperimentResultGhostItemListComponent implements OnInit {

  @Input() ghosts: [];

  constructor() { }

  ngOnInit() {
  }

}
