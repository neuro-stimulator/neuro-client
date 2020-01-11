import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-param-config-experiments',
  templateUrl: './param-config-experiments.component.html',
  styleUrls: ['./param-config-experiments.component.sass']
})
export class ParamConfigExperimentsComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }
}
