import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-param-config-server',
  templateUrl: './param-config-server.component.html',
  styleUrls: ['./param-config-server.component.sass']
})
export class ParamConfigServerComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
