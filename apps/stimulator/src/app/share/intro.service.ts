import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as introjs from 'intro.js';
import { IntroJs, Step } from 'intro.js';
import { LocalStorageService } from 'angular-2-local-storage';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { environment} from '../../environments/environment';
import { SettingsService } from '../settings/settings.service';

export const INTRO_STEPS = new InjectionToken<number>('defaultIntroSteps');

declare interface ComponentIntro {
  [component: string]: boolean;
}

declare interface ComponentsSteps {
  [component: string]: Step[];
}

declare interface IntroTranslation {
  next: string;
  prev: string;
  skip: string;
  done: string;
}

@Injectable({
  providedIn: 'root'
})
export class IntroService {

  private static readonly COMPONENT_INTRO_KEY = 'intro';

  private readonly intro: IntroJs = introjs();
  private componentIntros: ComponentIntro;
  private stepsByComponents: ComponentsSteps;

  private translation: IntroTranslation;

  constructor(@Inject(INTRO_STEPS) stepsByComponentsPromise: Promise<ComponentsSteps>,
              private readonly _http: HttpClient,
              private readonly _storage: LocalStorageService,
              private readonly _translator: TranslateService,
              private readonly _settings: SettingsService,
              private readonly logger: NGXLogger) {
    this._loadComponents();
    stepsByComponentsPromise.then((steps: ComponentsSteps) => {
      this.stepsByComponents = steps;
    }).catch((reason) => {
      this.stepsByComponents = undefined;
    });
    this._initTranslation().then();
  }

  private _loadComponents() {
    this.componentIntros = this._storage.get<ComponentIntro>(IntroService.COMPONENT_INTRO_KEY) || {};
  }

  private async _initTranslation() {
    // Opravdu podivná zvláštnost
    // První získání překladu musí být zavoláno 2x, jinak se překlad nezíská
    let next = await this._translator.get('SHARE.INTRO.DALSI').toPromise();
    next = await this._translator.get('SHARE.INTRO.NEXT').toPromise();
    const prev = await this._translator.get('SHARE.INTRO.PREV').toPromise();
    const skip = await this._translator.get('SHARE.INTRO.SKIP').toPromise();
    const done = await this._translator.get('SHARE.INTRO.DONE').toPromise();
    this.translation = {
      next, prev, skip, done
    };
  }

  private _saveComponentIntro(component: string) {
    this.componentIntros[component] = true;
    this._storage.set(IntroService.COMPONENT_INTRO_KEY, this.componentIntros);
  }

  private _showIntroSteps(component: string, beforeShow: () => void = (): void => {}, afterExit: () => void = (): void => {}) {
    if (!this.stepsByComponents || !this.stepsByComponents[component]) {
      this.logger.error(`Nemůžu zobrazit tutorial pro komponentu: '${component}'!`);
      return;
    }

    if (this.componentIntros[component]) {
      this.logger.trace(`Tutorial pro komponentu jsem již zobrazil, takže ho nebudu zobrazovat znovu.`);
      return;
    }

    const steps = this.stepsByComponents[component];
    const promises = [];
    for (const componentStepsKey of Object.keys(steps)) {
      const componentStep: Step = steps[componentStepsKey];
      const promise = this._translator.get(componentStep.intro).toPromise().then(translation => {
        return componentStep.intro = translation;
      });
      promises.push(promise);
    }

    Promise.all(promises).then(() => {
      this.logger.info(`Budu zobrazovat tutorial pro komponentu: '${component}'.`);
      this.intro.setOptions({
        steps,
        nextLabel: this.translation.next,
        prevLabel: this.translation.prev,
        skipLabel: this.translation.skip,
        doneLabel: this.translation.done
      });
      this.intro.onbeforechange(element => {
        console.log(element);
      });
      this.intro.oncomplete(() => {
        this._saveComponentIntro(component);
      });
      this.intro.onexit(() => {
        afterExit();
      });
      beforeShow();
      setTimeout(() => {
        this.intro.start();
      }, environment.introDelay);
    });


  }

  public showIntro(component: string, beforeShow?: () => void, afterExit?: () => void) {
    if (!component || environment.disableTutorial || this._settings.settings.application.disableTutorial) {
      return;
    }

    this._showIntroSteps(component, beforeShow, afterExit);
  }

  public resetTutorials() {
    this.componentIntros = {};
    this._storage.remove(IntroService.COMPONENT_INTRO_KEY);
  }
}
