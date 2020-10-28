import { AfterViewInit, Component, ComponentFactoryResolver, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ExperimentStopConditionParams, ExperimentStopConditionType } from '@stechy1/diplomka-share';

import { PlayerFacade, PlayerState, StopConditionType } from '@diplomka-frontend/stim-feature-player/domain';

import { StopConditionDirective } from './stop-condition.directive';
import { StopConditionComponentProvider } from './stop-condition-component.provider';
import { StopConditionChildComponent } from './stop-condition-child.component';

@Component({
  selector: 'stim-feature-player-stop-conditions',
  templateUrl: './stop-conditions.component.html',
  styleUrls: ['./stop-conditions.component.sass'],
})
export class StopConditionsComponent implements AfterViewInit {
  @Input() supportStopConditions: Observable<boolean>;
  @Input() availableStopConditions: Observable<StopConditionType[]>;
  @Input() form: FormGroup;

  // Obsah dialogu
  @ViewChild(StopConditionDirective, { static: false })
  stopConditionDirective: StopConditionDirective;

  private _stopConditionViewInstance: StopConditionChildComponent;
  private _stopConditions: ExperimentStopConditionParams = {};

  constructor(
    private readonly facade: PlayerFacade,
    private readonly stopConditionComponentProvider: StopConditionComponentProvider,
    private readonly componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngAfterViewInit(): void {
    this.facade.state
      .pipe(
        map((state: PlayerState) => [state.stopConditionType, state.stopConditions]),
        filter((stopCondition) => !!stopCondition)
      )
      .subscribe(([stopConditionType, stopConditions]: [ExperimentStopConditionType, ExperimentStopConditionParams]) => {
        console.log('Změna stavu');
        this._stopConditions = stopConditions;
        this._loadStopCondition(stopConditionType, stopConditions);
      });
    setTimeout(() => {
      this.stopConditionType.valueChanges.subscribe((value) => {
        console.log('Změna ve formuláři.');
        this._loadStopCondition(value, this._stopConditions);
      });
    }, 700);
  }

  private _loadStopCondition(stopConditionType: ExperimentStopConditionType, stopConditions: ExperimentStopConditionParams) {
    const componentClass = this.stopConditionComponentProvider.mapStopConditionToComponent(stopConditionType);
    if (!componentClass || !this.stopConditionDirective) {
      return;
    }
    console.log(ExperimentStopConditionType[stopConditionType]);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const viewContainerRef = this.stopConditionDirective.viewContainerRef;
    viewContainerRef.clear();

    const component = viewContainerRef.createComponent(componentFactory);
    this._stopConditionViewInstance = component.instance as StopConditionChildComponent;
    const stopConditionsForm = this._stopConditionViewInstance.form;
    this.form.removeControl('stopConditions');
    this.form.addControl('stopConditions', stopConditionsForm);
    if (!this._stopConditionViewInstance.areStopConditionsValid(stopConditions)) {
      console.log('Nejsou validní lokální zastavovací podmínky. vytvářím nové prázdné.');
      this._stopConditions = this._stopConditionViewInstance.createEmptyStopConditions();
      stopConditions = this._stopConditions;
    }
    console.log('Nastavuji zastavovací podmínky na:');
    console.log(stopConditions);
    stopConditionsForm.setValue(stopConditions);
  }

  get state(): Observable<PlayerState> {
    return this.facade.state;
  }

  get stopConditionType(): FormControl {
    return this.form.get('stopConditionType') as FormControl;
  }
}
