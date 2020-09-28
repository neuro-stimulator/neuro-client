import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import {
  PlayerFacade,
  PlayerState,
  StopConditionType,
} from '@diplomka-frontend/stim-feature-player/domain';

@Component({
  selector: 'stim-feature-player-stop-conditions',
  templateUrl: './stop-conditions.component.html',
  styleUrls: ['./stop-conditions.component.sass'],
})
export class StopConditionsComponent implements OnInit {
  @Input() supportStopConditions: Observable<boolean>;
  @Input() availableStopConditions: StopConditionType[];
  @Input() form: FormGroup;

  constructor(private readonly facade: PlayerFacade) {}

  ngOnInit(): void {}

  get state(): Observable<PlayerState> {
    return this.facade.state;
  }
}
