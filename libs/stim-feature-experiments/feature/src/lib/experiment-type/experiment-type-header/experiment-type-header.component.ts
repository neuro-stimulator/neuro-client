import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'stim-feature-experiments-experiment-type-header',
  templateUrl: './experiment-type-header.component.html',
  styleUrls: ['./experiment-type-header.component.sass'],
})
export class ExperimentTypeHeaderComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() showOutputEditor: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  public handleShowOutputEditor() {
    this.showOutputEditor.emit();
  }
}
