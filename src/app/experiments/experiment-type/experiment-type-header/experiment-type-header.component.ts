import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-experiment-type-header',
  templateUrl: './experiment-type-header.component.html',
  styleUrls: ['./experiment-type-header.component.sass']
})
export class ExperimentTypeHeaderComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

}
