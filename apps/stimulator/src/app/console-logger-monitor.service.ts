import { INGXLoggerMetadata, INGXLoggerMonitor, NgxLoggerLevel } from 'ngx-logger';

import { ConsoleFacade } from '@neuro-client/stim-feature-settings/domain';

export class ConsoleLoggerMonitorService implements INGXLoggerMonitor {
  constructor(private readonly console: ConsoleFacade) {
  }

  onLog(logObject: INGXLoggerMetadata): void {
    if (logObject.level === NgxLoggerLevel.INFO) {
      this.console.saveCommand(logObject.message);
    }
  }
}
