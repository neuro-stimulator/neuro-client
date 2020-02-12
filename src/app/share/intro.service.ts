import { EventEmitter, Inject, Injectable, InjectionToken } from '@angular/core';

import * as introjs from 'intro.js';
import { Step } from 'intro.js';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment, makeURL } from '../../environments/environment';
import { ResponseObject } from '@stechy1/diplomka-share';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

export const INTRO_STEPS = new InjectionToken<number>('defaultIntroSteps');

declare interface ComponentIntro {
  [component: string]: boolean;
}

declare interface ComponentsSteps {
  [component: string]: Step[];
}

@Injectable({
  providedIn: 'root'
})
export class IntroService {

  private static readonly COMPONENT_INTRO_KEY = 'intro';

  private readonly intro = introjs();
  private componentIntros: ComponentIntro;
  private stepsByComponents: ComponentsSteps;

  constructor(@Inject(INTRO_STEPS) stepsByComponentsObservable: Observable<Promise<ComponentsSteps>>,
              private readonly _http: HttpClient,
              private readonly _storage: LocalStorageService,
              private readonly logger: NGXLogger) {
    this.loadComponents();
    stepsByComponentsObservable.subscribe(stepsByComponentsPromise => {
      stepsByComponentsPromise.then(steps => {
        this.stepsByComponents = steps;
      });
    });
  }

  private loadComponents() {
    this.componentIntros = this._storage.get<ComponentIntro>(IntroService.COMPONENT_INTRO_KEY) || {};
  }

  private _saveComponentIntro(component: string) {
    this.componentIntros[component] = true;
    this._storage.set(IntroService.COMPONENT_INTRO_KEY, this.componentIntros);
  }

  private showIntroSteps(component: string) {
    if (!this.stepsByComponents[component]) {
      this.logger.error(`Nemůžu zobrazit tutorial pro komponentu: '${component}'!`);
      return;
    }

    if (this.componentIntros[component]) {
      this.logger.trace(`Tutorial pro komponentu jsem již zobrazil, takže ho nebudu zobrazovat znovu.`);
      return;
    }

    this.logger.info(`Budu zobrazovat tutorial pro komponentu: '${component}'.`);
    this.intro.setOptions({
      steps: this.stepsByComponents[component]
    });
    this.intro.oncomplete(() => this._saveComponentIntro(component));
    this.intro.start();
  }

  public showIntro(component: string) {
    if (!component) {
      return;
    }
    this.showIntroSteps(component);
  }
}
