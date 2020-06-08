import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stim-experiment-ghost-item-list',
  templateUrl: './experiment-ghost-item-list.component.html',
  styleUrls: ['./experiment-ghost-item-list.component.sass']
})
export class ExperimentGhostItemListComponent implements OnInit {

  @Input() ghosts: [];

  constructor() {
  }

  ngOnInit() {
  }

}
