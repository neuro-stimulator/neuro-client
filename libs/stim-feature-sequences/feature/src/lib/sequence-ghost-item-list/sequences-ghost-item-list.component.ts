import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stim-feature-sequences-ghost-item-list',
  templateUrl: './sequences-ghost-item-list.component.html',
  styleUrls: ['./sequences-ghost-item-list.component.sass']
})
export class SequencesGhostItemListComponent implements OnInit {

  @Input() ghosts: [];

  constructor() { }

  ngOnInit() {
  }

}
