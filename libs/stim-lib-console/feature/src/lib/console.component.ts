import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { ConsoleFacade, ConsoleState } from '@diplomka-frontend/stim-lib-console/domain';

@Component({
  selector: 'stim-lib-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.sass'],
})
export class ConsoleComponent implements OnInit {
  @ViewChild('consoleOutput', { static: true }) consoleOutput: ElementRef;
  @ViewChild('inputCommand', { static: true }) inputCommand: ElementRef;

  constructor(public facade: ConsoleFacade) {}

  public get state(): Observable<ConsoleState> {
    return this.facade.state;
  }

  ngOnInit() {
    this.facade.loadHistory();
  }

  handleClearHistory() {
    this.facade.clearHistory();
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
