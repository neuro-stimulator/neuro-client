import { AfterContentInit, Component, Input, OnDestroy} from '@angular/core';
import { ControlContainer, FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';

import { Options as SliderOptions } from 'ng5-slider';

import { environment } from '../../../../../environments/environment';

import { OutputDependency } from 'diplomka-share';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-experiment-type-erp-output',
  templateUrl: './experiment-type-erp-output.component.html',
  styleUrls: ['./experiment-type-erp-output.component.sass'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ExperimentTypeErpOutputComponent implements AfterContentInit, OnDestroy {

  private static readonly GENERAL_DISTRIBUTION_SLIDER_OPTIONS: SliderOptions = {
    floor: 0,
    ceil: 100,
    showTicks: false,
    showTicksValues: false,
    tickStep: 1,
    showSelectionBar: true,
    animate: false
  };

  private _outputCountSubscription: Subscription;
  private _outputDistributionSubscriptions: Subscription[] = [];
  private _oldOutputCount = environment.maxOutputCount;
  private _experimentLoadedSubscription: Subscription;

  @Input() form: FormGroup;
  @Input() count: number;
  @Input() experimentId: number;
  @Input() experimentLoaded: Observable<any>;

  distributionSliderOptions: SliderOptions[] = [];

  brightnessSliderOptions: SliderOptions = {
    floor: 0,
    ceil: 100,
    showTicks: false,
    showTicksValues: false,
    tickStep: 1,
    showSelectionBar: true,
    animate: false
  };

  constructor() {
    for (let i = 0; i < environment.maxOutputCount; i++) {
      this.distributionSliderOptions.push({...ExperimentTypeErpOutputComponent.GENERAL_DISTRIBUTION_SLIDER_OPTIONS});
    }
  }

  ngAfterContentInit(): void {
    this._experimentLoadedSubscription = this.experimentLoaded.subscribe(() => {
      this._oldOutputCount = this.form.root.get('outputCount').value;
      this._listenOutputCountChange();
      this._listenOutputDistributionChange();
      // Vyvolám umělou změnu v hodnotě distribuce pro neexistující výstup
      // Tím se přepočítají maximální hodnoty pro posuvníky
      this._onOutputDistributionChange(-1);
    });
  }

  ngOnDestroy(): void {
    this._outputCountSubscription.unsubscribe();
    for (let i = 0; i < environment.maxOutputCount; i++) {
      this._outputDistributionSubscriptions[i].unsubscribe();
    }
    this._experimentLoadedSubscription.unsubscribe();
  }

  private _addDependency(index: number, value: string) {
    let dependencies = this.dependencies(index).value as OutputDependency[];
    if (dependencies === undefined) {
      dependencies = [];
      this.dependencies(index)
          .setValue(dependencies);
    }

    const params = value.split('x');

    dependencies.push({
      id: Math.random(),
      experimentId: this.experimentId,
      sourceOutput: index + 1,
      destOutput: +params[0],
      count: +params[1]
    });
  }

  private _removeDependency(index: number, dependency: OutputDependency) {
    const dependencies = this.dependencies(index).value as OutputDependency[];
    dependencies.splice(dependencies.findIndex(value => value.id === dependency.id));
  }

  private _onOutputCountChange(value: number) {
    // V případě, že zvětšuji počet, tak nemusím nic přepočítávat,
    // protože nově inicializované výstupy budou na výchozích hodnotách
    if (value > this._oldOutputCount) {
      this._oldOutputCount = value;
      return;
    }
    const tmpOldValue = this._oldOutputCount;
    this._oldOutputCount = value;

    for (let i = value; i < tmpOldValue; i++) {
      this.distribution(i)
          .setValue(0);
    }
  }

  private _listenOutputCountChange() {
    this._outputCountSubscription = this.form.root.get('outputCount')
                                        .valueChanges
                                        .subscribe((value: number) => this._onOutputCountChange(value));
  }

  private _onOutputDistributionChange(i: number) {
    let total = 0;

    for (let j = 0; j < this._oldOutputCount; j++) {
      total += this.distribution(j).value;
    }

    for (let j = 0; j < this._oldOutputCount; j++) {
      // Nechci aktualizovat maximální hodnotu právě nastavovaného
      // čísla, proto ho přeskočím
      if (j === i) {
        continue;
      }
      // shorturl.at/ijAFQ
      const newOptions: SliderOptions = Object.assign({}, this.distributionSliderOptions[j]);
      newOptions.ceil = 100 - total + this.distribution(j).value;
      this.distributionSliderOptions[j] = newOptions;
    }
  }

  private _listenOutputDistributionChange() {
    for (let i = 0; i < environment.maxOutputCount; i++) {
      this._outputDistributionSubscriptions.push(this.distribution(i)
                                                     .valueChanges
                                                     .subscribe((value: number) => this._onOutputDistributionChange(i)));
    }
  }

  get outputs() {
    return (this.form.get('outputs') as FormArray).controls;
  }

  outputType(index: number): FormGroup {
    return this.outputs[index].get('outputType') as FormGroup;
  }

  pulseUp(index: number) {
    return this.outputs[index].get('pulseUp');
  }

  pulseDown(index: number) {
    return this.outputs[index].get('pulseDown');
  }

  distribution(index: number) {
    return this.outputs[index].get('distribution') as FormControl;
  }

  brightness(index: number) {
    return this.outputs[index].get('brightness');
  }

  dependencies(index: number) {
    return (this.outputs[index].get('dependencies') as FormArray).controls[0];
  }

  dependencyValue(index: number) {
    return (this.outputs[index].get('dependencies') as FormArray).controls[1];
  }

  handleRemoveDependency(index: number, dependency: OutputDependency) {
    this._removeDependency(index, dependency);
  }

  handleDependencyKeyUp(event: KeyboardEvent, index: number, value: string) {
    if (event.key === 'Enter') {
      if (this.dependencyValue(index).invalid) {
        return;
      }
      if (value.trim().length === 0) {
        return;
      }

      const srcElement = (event.target as HTMLInputElement);
      this._addDependency(index, value);
      srcElement.value = '';
    }
  }
}
