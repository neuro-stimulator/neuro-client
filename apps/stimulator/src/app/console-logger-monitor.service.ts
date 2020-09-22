import { NgxLoggerLevel, NGXLoggerMonitor, NGXLogInterface } from 'ngx-logger';
import { ConsoleFacade } from '@diplomka-frontend/stim-feature-settings/domain';

export class ConsoleLoggerMonitorService implements NGXLoggerMonitor {
  constructor(private readonly console: ConsoleFacade) {}

  onLog(logObject: NGXLogInterface): void {
    if (logObject.level === NgxLoggerLevel.INFO) {
      this.console.saveCommand(logObject.message);
    }
  }
}
