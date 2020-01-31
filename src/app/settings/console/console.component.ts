import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { SerialDataEvent, StimulatorDebugEvent } from '../../share/serial-data.event';
import { SerialService } from '../../share/serial.service';
import { ConsoleService } from './console.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.sass']
})
export class ConsoleComponent implements OnInit, OnDestroy {

  private _serialRawDataSubscription: Subscription;

  constructor(public console: ConsoleService,
              private readonly _serial: SerialService) { }

  private _handleRawData(event: SerialDataEvent) {
    switch (event.name) {
      case 'EventDebug':
        this._handleStimulatorDebugEvent(event as StimulatorDebugEvent);
        break;
    }
  }

  private _handleStimulatorDebugEvent(event: StimulatorDebugEvent) {
    this.console.saveCommandRaw(event.data.toString());
  }

  ngOnInit() {
    this._serialRawDataSubscription = this._serial.rawData$.subscribe((event: SerialDataEvent) => this._handleRawData(event));
  }

  ngOnDestroy(): void {
    this._serialRawDataSubscription.unsubscribe();
  }

  handleClearHistory() {
    this.console.clearHistory();
  }

  handleCommandTextChange(event: Event) {
    this.console.processCommand((event.target as HTMLInputElement).value);
    (event.target as HTMLInputElement).value = '';
  }
}
