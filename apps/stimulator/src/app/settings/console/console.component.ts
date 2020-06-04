import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { SerialDataEvent, StimulatorMemoryEvent, StimulatorSequencePartRequestEvent } from '@stechy1/diplomka-share';

import { SerialService } from '../../share/serial.service';
import { ConsoleService } from './console.service';
import { ConsoleCommand } from './console-command';

@Component({
  selector: 'stim-console',
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
      case 'EventMemory':
        this._handleStimulatorMemoryEvent(event as StimulatorMemoryEvent);
        break;
      case 'EventNextSequencePart':
        this._handleStimulatorNextSequencePartRequestEvent(event as StimulatorSequencePartRequestEvent);
        break;
    }
  }

  private _handleStimulatorMemoryEvent(event: StimulatorMemoryEvent) {
    this.console.saveCommandRaw(event.data.toString());
  }

  private _handleStimulatorNextSequencePartRequestEvent(event: StimulatorSequencePartRequestEvent) {
    this.console.saveCommandRaw(JSON.stringify(event));
  }

  ngOnInit() {
    this._serialRawDataSubscription = this._serial.rawData$.subscribe((event: SerialDataEvent) => this._handleRawData(event));

    this.console.commands$.subscribe((value: ConsoleCommand[]) => {
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
