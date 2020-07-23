import { Component } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { NavigationFacade } from '@diplomka-frontend/stim-feature-navigation/domain';
import {
  SettingsFacade,
  SettingsState,
} from '@diplomka-frontend/stim-feature-settings/domain';
import { AuthFacade } from '@diplomka-frontend/stim-feature-auth/domain';

import { environment } from '../environments/environment';
import { ConsoleLoggerMonitorService } from './console-logger-monitor.service';
import { getLocaleLoader } from './locale-loader';

@Component({
  selector: 'stim-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent /*implements OnInit, AfterViewInit*/ {
  private static readonly NO_FIRST_TIME_KEY = 'no-first-time';

  constructor(
    public readonly navigation: NavigationFacade,
    private readonly settings: SettingsFacade,
    private readonly translator: TranslateService,
    private readonly auth: AuthFacade,
    private readonly logger: NGXLogger
  ) {
    // Zaregistruji logovací monitor pro lepší formát logů
    logger.registerMonitor(new ConsoleLoggerMonitorService(console));
    // Načtu lokální nastavení aplikace
    settings.loadLocalSettings();

    // Řeknu translatoru, jaké jazyky se budou podporovat
    translator.addLangs(
      environment.supportedLanguages.map((language) => language.value)
    );
    // A nastavím mu výchozí jazyk
    translator.setDefaultLang(environment.defaultLanguage);

    this.settings.state
      .pipe(
        // Vyfiltruji pouze takové stavy, kdy je nastavení již načteno
        filter((state: SettingsState) => state.localSettingsLoaded),
        // Pomocí mapování získám aktuální jazyk aplikace
        map((state: SettingsState) => state.localSettings.application.language),
        // Řeknu překladačí, jaký jazyk se bude používat
        tap((language: string) => {
          translator.use(language);
        }),
        // Dále získám locale loader a pomocí switch mapy
        // přehodím řízení asynchronního kódu na loader
        switchMap((language: string) => {
          return getLocaleLoader(language);
        })
        // Až loader načte locales
      )
      .subscribe((locale: { default: string }) => {
        // Tak je zeregistruji
        registerLocaleData(locale.default);
      });
  }

  // constructor(public readonly navigation: NavigationService,
  //             private readonly serial: SerialService,
  //             private readonly ipc: IpcService,
  //             private readonly console: ConsoleService,
  //             private readonly translate: TranslateService,
  //             private readonly settings: SettingsService,
  //             private readonly storage: LocalStorageService,
  //             private readonly router: Router,
  //             private readonly introService: IntroService,
  //             private readonly logger: NGXLogger) {
  //   logger.registerMonitor(new ConsoleLoggerMonitorService(console));
  //
  //   translate.addLangs(environment.supportedLanguages.map((language) => language.value));
  //   translate.setDefaultLang(environment.defaultLanguage);
  //   translate.use(settings.settings.application.language || environment.defaultLanguage);
  //   switch (settings.settings.application.language) {
  //     case 'cz':
  //       registerLocaleData(localeCZECH);
  //       break;
  //     case 'en':
  //       registerLocaleData(localeENGLISH);
  //       break;
  //   }
  // }
  //
  // ngOnInit(): void {
  //   if (!this.storage.get<string>(AppComponent.NO_FIRST_TIME_KEY) && !environment.testing) {
  //     this.storage.set(AppComponent.NO_FIRST_TIME_KEY, true);
  //     this.router.navigate(['about']);
  //   }
  // }
  //
  // ngAfterViewInit(): void {
  //   this.navigation.navigationChange$
  //       .subscribe((value) => {
  //         const introComponent = value['intro'] || undefined;
  //         this.introService.showIntro(introComponent);
  //       });
  // }
}
