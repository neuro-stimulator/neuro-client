import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stim-sequence-ghost-item-list',
  templateUrl: './sequence-ghost-item-list.component.html',
  styleUrls: ['./sequence-ghost-item-list.component.sass']
})
export class SequenceGhostItemListComponent implements OnInit {

  @Input() ghosts: [];

  constructor() { }

  ngOnInit() {
  }

}
