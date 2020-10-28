import { Component, Input } from '@angular/core';

@Component({
  selector: 'stim-lib-ui-dropdown-btn',
  templateUrl: './dropdown-btn.component.html',
  styleUrls: ['./dropdown-btn.component.sass'],
})
export class DropdownBtnComponent {
  @Input() buttonAsLink = false;
  @Input() text: string;
  @Input() navigationLink: string[];
  @Input() queryParams: Record<string, unknown>;
  @Input() small = false;
  @Input() large = false;
  @Input() disabled = false;
  @Input() icon: string;

  showDropdown = false;
}
