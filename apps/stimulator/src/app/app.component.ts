import { Component } from "@angular/core";
import { NavigationFacade } from "@diplomka-frontend/stim-feature-navigation/domain";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../environments/environment";
import { SettingsFacade } from "@diplomka-frontend/stim-feature-settings/domain";
import { registerLocaleData } from "@angular/common";
import { NGXLogger } from "ngx-logger";
import { ConsoleLoggerMonitorService } from "./console-logger-monitor.service";

@Component({
  selector: "stim-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent /*implements OnInit, AfterViewInit*/ {

  private static readonly NO_FIRST_TIME_KEY = "no-first-time";

  constructor(public readonly navigation: NavigationFacade,
              private readonly settings: SettingsFacade,
              private readonly translator: TranslateService,
              private readonly logger: NGXLogger) {
    logger.registerMonitor(new ConsoleLoggerMonitorService(console));
    settings.loadLocalSettings();

    translator.addLangs(environment.supportedLanguages.map((language) => language.value));
    translator.setDefaultLang(environment.defaultLanguage);
    translator.use(/*settings.settings.application.language || */environment.defaultLanguage);
    let localeLoader;

    switch (/*settings.settings.application.language*/environment.defaultLanguage) {
      case 'cz':
        localeLoader = import('@angular/common/locales/cs');
        break;
      case 'en':
        localeLoader = import('@angular/common/locales/en-GB');
        break;
    }

    localeLoader.then(locale => {
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
