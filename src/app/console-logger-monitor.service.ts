import { Injectable } from '@angular/core';
import { NgxLoggerLevel, NGXLoggerMonitor, NGXLogInterface } from 'ngx-logger';
import { ConsoleService } from './settings/console/console.service';

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggerMonitorService implements NGXLoggerMonitor {

  constructor(private readonly console: ConsoleService) { }

  onLog(logObject: NGXLogInterface): void {
    if (logObject.level === NgxLoggerLevel.INFO) {
      this.console.saveCommandRaw(logObject.message, new Date(logObject.timestamp));
    }
  }
}
