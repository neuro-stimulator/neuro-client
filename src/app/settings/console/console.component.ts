import { Component, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core';

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

  @ViewChild('consoleOutput', {static: true}) consoleOutput: ElementRef;
  @ViewChild('inputCommand', {static: true}) inputCommand: ElementRef;

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

    this.console.commands$.subscribe(value => {
      setTimeout(() => {
      const consoleOutput = this.consoleOutput.nativeElement;
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
      }, 100);
    });
  }

  ngOnDestroy(): void {
    this._serialRawDataSubscription.unsubscribe();
  }

  handleClearHistory() {
    this.console.clearHistory();
    this.requestInputFocus();
  }

  handleCommandTextChange(event: Event) {
    this.console.processCommand((event.target as HTMLInputElement).value);
    (event.target as HTMLInputElement).value = '';
  }

  requestInputFocus() {
    (this.inputCommand.nativeElement as HTMLInputElement).focus();
  }
}
