import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as introjs from 'intro.js';
import { Step } from 'intro.js';
import { LocalStorageService } from 'angular-2-local-storage';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

import { environment} from '../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

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

  private readonly intro = introjs();
  private componentIntros: ComponentIntro;
  private stepsByComponents: ComponentsSteps;

  private translation: IntroTranslation;

  private componentCallback: () => void;

  constructor(@Inject(INTRO_STEPS) stepsByComponentsObservable: Observable<Promise<ComponentsSteps>>,
              private readonly _http: HttpClient,
              private readonly _storage: LocalStorageService,
              private readonly _translator: TranslateService,
              private readonly logger: NGXLogger) {
    this._loadComponents();
    stepsByComponentsObservable.subscribe(stepsByComponentsPromise => {
      stepsByComponentsPromise.then(steps => {
        this.stepsByComponents = steps;
      }).catch(reason => {
        this.stepsByComponents = undefined;
        this._callComponentCallback();
      });
    });
    this._initTranslation().finally();
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

  private _showIntroSteps(component: string) {
    if (!this.stepsByComponents || !this.stepsByComponents[component]) {
      this.logger.error(`Nemůžu zobrazit tutorial pro komponentu: '${component}'!`);
      this._callComponentCallback();
      return;
    }

    if (this.componentIntros[component]) {
      this.logger.trace(`Tutorial pro komponentu jsem již zobrazil, takže ho nebudu zobrazovat znovu.`);
      this._callComponentCallback();
      return;
    }

    this.logger.info(`Budu zobrazovat tutorial pro komponentu: '${component}'.`);
    this.intro.setOptions({
      steps: this.stepsByComponents[component],
      nextLabel: this.translation.next,
      prevLabel: this.translation.prev,
      skipLabel: this.translation.skip,
      doneLabel: this.translation.done
    });
    this.intro.oncomplete(() => {
      this._saveComponentIntro(component);
    });
    this.intro.onexit(() => {
      this._callComponentCallback();
    });
    this.intro.start();
  }

  private _callComponentCallback() {
    if (this.componentCallback) {
      this.componentCallback();
      this.componentCallback = undefined;
    }
  }

  public showIntro(component: string) {
    if (!component) {
      return;
    }

    setTimeout(() => {
      this._showIntroSteps(component);
    }, environment.introDelay);
  }

  public wasIntroShown(component: string): boolean {
    return this.componentIntros[component];
  }

  public registerOnExitCallback(callback: () => void) {
    this.componentCallback = callback;
  }
}
