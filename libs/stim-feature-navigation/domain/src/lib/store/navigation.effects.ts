import { Injectable } from "@angular/core";

import { Actions } from "@ngrx/effects";

import { NavigationService } from "../infrastructure/navigation.service";

@Injectable()
export class NavigationEffects {

  constructor(private readonly navigation: NavigationService,
              private readonly actions$: Actions) {}


}
