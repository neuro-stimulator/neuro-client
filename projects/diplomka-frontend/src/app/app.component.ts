import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeCZECH from '@angular/common/locales/cs';
import localeENGLISH from '@angular/common/locales/en-GB';

import { LocalStorageService } from 'angular-2-local-storage';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { environment } from '../environments/environment';
import { NavigationService } from './navigation/navigation.service';
import { SerialService } from './share/serial.service';
import { SequenceService } from './share/sequence.service';
import { ConsoleService } from './settings/console/console.service';
import { ConsoleLoggerMonitorService } from './console-logger-monitor.service';
import { IpcService } from './share/ipc.service';
import { SettingsService } from './settings/settings.service';
import { IntroService } from './share/intro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterViewInit {

  private static readonly NO_FIRST_TIME_KEY = 'no-first-time';

  constructor(public readonly navigation: NavigationService,
              private readonly serial: SerialService,
              private readonly ipc: IpcService,
              private readonly sequence: SequenceService,
              private readonly console: ConsoleService,
              private readonly translate: TranslateService,
              private readonly settings: SettingsService,
              private readonly storage: LocalStorageService,
              private readonly router: Router,
              private readonly introService: IntroService,
              private readonly logger: NGXLogger) {
    logger.registerMonitor(new ConsoleLoggerMonitorService(console));

    translate.addLangs(environment.supportedLanguages.map((language) => language.value));
    translate.setDefaultLang(environment.defaultLanguage);
    translate.use(settings.settings.application.language || environment.defaultLanguage);
    switch (settings.settings.application.language) {
      case 'cz':
        registerLocaleData(localeCZECH);
        break;
      case 'en':
        registerLocaleData(localeENGLISH);
        break;
    }
  }

  ngOnInit(): void {
    if (!this.storage.get<string>(AppComponent.NO_FIRST_TIME_KEY) && !environment.testing) {
      this.storage.set(AppComponent.NO_FIRST_TIME_KEY, true);
      this.router.navigate(['about']);
    }
  }

  ngAfterViewInit(): void {
    this.navigation.navigationChange$
        .subscribe((value) => {
          const introComponent = value['intro'] || undefined;
          this.introService.showIntro(introComponent);
        });
  }
}
