import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stim-dropdown-btn',
  templateUrl: './dropdown-btn.component.html',
  styleUrls: ['./dropdown-btn.component.sass']
})
export class DropdownBtnComponent implements OnInit {

  @Input() buttonAsLink = false;
  @Input() text: string;
  @Input() navigationLink: string[];
  @Input() queryParams: {};
  @Input() small = false;
  @Input() large = false;
  @Input() disabled = false;
  @Input() icon: string;

  showDropdown = false;

  constructor() { }

  ngOnInit() {
  }

}
