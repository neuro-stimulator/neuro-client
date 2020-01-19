import { Component } from '@angular/core';

import { NGXLogger } from 'ngx-logger';

import { NavigationService } from './navigation/navigation.service';
import { SerialService } from './share/serial.service';
import { SequenceService } from './share/sequence.service';
import { ConsoleService } from './settings/console/console.service';
import { ConsoleLoggerMonitorService } from './console-logger-monitor.service';
import { IpcService } from './share/ipc.service';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(public readonly navigation: NavigationService,
              private readonly serial: SerialService,
              private readonly ipc: IpcService,
              private readonly sequence: SequenceService,
              private readonly console: ConsoleService,
              private readonly translate: TranslateService,
              private readonly settings: SettingsService,
              private readonly logger: NGXLogger) {
    logger.registerMonitor(new ConsoleLoggerMonitorService(console));

    translate.addLangs(['en', 'cz']);
    translate.setDefaultLang('cz');
    translate.use(settings.settings.language || 'cz');
  }
}
