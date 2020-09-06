import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Subscription } from 'rxjs';

import {
  StimulatorMemoryEvent,
  StimulatorSequencePartRequestEvent,
} from '@stechy1/diplomka-share';
import { ConsoleFacade } from '@diplomka-frontend/stim-lib-console/domain';

@Component({
  selector: 'stim-lib-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.sass'],
})
export class ConsoleComponent implements OnInit, OnDestroy {
  @ViewChild('consoleOutput', { static: true }) consoleOutput: ElementRef;
  @ViewChild('inputCommand', { static: true }) inputCommand: ElementRef;

  constructor(public facade: ConsoleFacade) {}

  // private _handleRawData(event: SerialDataEvent) {
  //   switch (event.name) {
  //     case 'EventMemory':
  //       this._handleStimulatorMemoryEvent(event as StimulatorMemoryEvent);
  //       break;
  //     case 'EventNextSequencePart':
  //       this._handleStimulatorNextSequencePartRequestEvent(event as StimulatorSequencePartRequestEvent);
  //       break;
  //   }
  // }

  // private _handleStimulatorMemoryEvent(event: StimulatorMemoryEvent) {
  //   // this.console.saveCommandRaw(event.data.toString());
  // }
  //
  // private _handleStimulatorNextSequencePartRequestEvent(
  //   event: StimulatorSequencePartRequestEvent
  // ) {
  //   // this.console.saveCommandRaw(JSON.stringify(event));
  // }

  ngOnInit() {
    // this._serialRawDataSubscription = this._serial.rawData$.subscribe((event: SerialDataEvent) => this._handleRawData(event));
    //
    // this.console.commands$.subscribe((value: ConsoleCommand[]) => {
    //   setTimeout(() => {
    //   const consoleOutput = this.consoleOutput.nativeElement;
    //   consoleOutput.scrollTop = consoleOutput.scrollHeight;
    //   }, 100);
    // });
  }

  ngOnDestroy(): void {
    // this._serialRawDataSubscription.unsubscribe();
  }

  handleClearHistory() {
    // this.console.clearHistory();
    this.requestInputFocus();
  }

  handleCommandTextChange(event: Event) {
    this.facade.processCommand((event.target as HTMLInputElement).value);
    (event.target as HTMLInputElement).value = '';
  }

  requestInputFocus() {
    (this.inputCommand.nativeElement as HTMLInputElement).focus();
  }
}
