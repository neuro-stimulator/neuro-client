import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiment-result-ghost-item',
  templateUrl: './experiment-result-ghost-item-list.component.html',
  styleUrls: ['./experiment-result-ghost-item-list.component.sass']
})
export class ExperimentResultGhostItemListComponent implements OnInit {

  @Input() ghosts: [];

  constructor() { }

  ngOnInit() {
  }

}
