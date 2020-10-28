import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Sequence, ExperimentType } from '@stechy1/diplomka-share';

import { EntityGroup, SelectedEntities } from '@diplomka-frontend/stim-lib-list-utils';

@Component({
  selector: 'stim-feature-sequences-item-list',
  templateUrl: './sequences-item-list.component.html',
  styleUrls: ['./sequences-item-list.component.sass'],
})
export class SequencesItemListComponent {
  @Input() sequenceGroups: EntityGroup<Sequence>;
  @Input() selectedSequences: SelectedEntities;
  @Input() selectionMode: boolean;
  @Output() view: EventEmitter<Sequence> = new EventEmitter<Sequence>();
  @Output() delete: EventEmitter<Sequence> = new EventEmitter<Sequence>();
  @Output() selectSequence: EventEmitter<Sequence> = new EventEmitter<Sequence>();

  ExperimentType = ExperimentType;

  handleView(experimentResult: Sequence) {
    this.view.next(experimentResult);
  }

  handleDelete(experimentResult: Sequence) {
    this.delete.next(experimentResult);
  }

  handleExperimentIconClick(sequence: Sequence) {
    if (this.selectionMode) {
      return;
    }

    this.selectSequence.emit(sequence);
  }
}
