import { Component, OnInit } from '@angular/core';

import { ConsoleService } from './console.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.sass']
})
export class ConsoleComponent implements OnInit {

  constructor(public console: ConsoleService) { }

  ngOnInit() {}

  handleClearHistory() {
    this.console.clearHistory();
  }

  handleCommandTextChange(event: Event) {
    this.console.processCommand((event.target as HTMLInputElement).value);
    (event.target as HTMLInputElement).value = '';
  }
}
