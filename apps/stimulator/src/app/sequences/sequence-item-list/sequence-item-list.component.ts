import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Sequence } from '@stechy1/diplomka-share';
import { EntityGroup } from '@diplomka-frontend/stim-lib-list-utils';

@Component({
  selector: 'stim-sequence-item-list',
  templateUrl: './sequence-item-list.component.html',
  styleUrls: ['./sequence-item-list.component.sass']
})
export class SequenceItemListComponent implements OnInit {

  @Input() sequenceGroups: EntityGroup<Sequence>;
  @Output() view: EventEmitter<Sequence> = new EventEmitter<Sequence>();
  @Output() delete: EventEmitter<Sequence> = new EventEmitter<Sequence>();

  constructor() { }

  ngOnInit() {}

  handleView(experimentResult: Sequence) {
    this.view.next(experimentResult);
  }

  handleDelete(experimentResult: Sequence) {
    this.delete.next(experimentResult);
  }

}
