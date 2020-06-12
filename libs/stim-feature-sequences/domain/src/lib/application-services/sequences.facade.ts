import { Sequence } from "@stechy1/diplomka-share";
import { Store } from '@ngrx/store';

import { BaseActions, BaseFacade } from "@diplomka-frontend/stim-lib-common";

import { SequencesState } from "../store/sequences.type";
import { Injectable } from "@angular/core";

@Injectable()
export class SequencesFacade extends BaseFacade<Sequence, SequencesState> {

  constructor(store: Store<SequencesState>) {
    super(store);
  }

  protected get baseActions(): BaseActions {
    return undefined;
  }

  protected get stateKey(): string {
    return '';
  }

}
