import { Sequence } from "@stechy1/diplomka-share";

import { BaseActions, BaseFacade } from "@diplomka-frontend/stim-lib-common";
import { SequencesState } from "../store/sequences.type";

export class SequencesFacade extends BaseFacade<Sequence, SequencesState> {
  protected get baseActions(): BaseActions {
    return undefined;
  }



}
