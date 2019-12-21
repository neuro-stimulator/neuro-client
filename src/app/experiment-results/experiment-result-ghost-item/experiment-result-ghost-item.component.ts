import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiment-result-ghost-item',
  templateUrl: './experiment-result-ghost-item.component.html',
  styleUrls: ['./experiment-result-ghost-item.component.sass']
})
export class ExperimentResultGhostItemComponent implements OnInit {

  @Input() ghosts: [];

  constructor() { }

  ngOnInit() {
  }

}
