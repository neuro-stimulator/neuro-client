import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { Sequence } from '@stechy1/diplomka-share';

@Component({
  selector: 'stim-sequence-item-list',
  templateUrl: './sequence-item-list.component.html',
  styleUrls: ['./sequence-item-list.component.sass']
})
export class SequenceItemListComponent implements OnInit {

  @Input() sequences: Observable<Sequence[]>;
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
