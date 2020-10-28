import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'stim-feature-settings-param-config-experiments',
  templateUrl: './param-config-experiments.component.html',
  styleUrls: ['./param-config-experiments.component.sass'],
})
export class ParamConfigExperimentsComponent {
  @Input() form: FormGroup;

  public static createForm(): FormGroup {
    return new FormGroup({
      showDescription: new FormControl(null),
      showTags: new FormControl(null),
      showCreationDate: new FormControl(null),
      showOutputType: new FormControl(null),
      showOutputCount: new FormControl(null),
      creationDateFormat: new FormGroup({
        showYears: new FormControl(null),
        showMonths: new FormControl(null),
        showDays: new FormControl(null),
        showHours: new FormControl(null),
        showMinutes: new FormControl(null),
        showSeconds: new FormControl(null),
        showMiliseconds: new FormControl(null),
      }),
    });
  }
}
