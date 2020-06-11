import { Component, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NGXLogger } from 'ngx-logger';

import { Sequence } from '@stechy1/diplomka-share';

import { ConfirmDialogComponent } from '@diplomka-frontend/stim-lib-modal';
import { ListGroupSortFilterService } from '@diplomka-frontend/stim-lib-list-utils';
import { FilterDialogComponent } from "@diplomka-frontend/stim-lib-ui";
import { ListButtonsAddonService, BaseListController } from "@diplomka-frontend/stim-lib-ui";
import { SequencesFacade, SequencesState } from '@diplomka-frontend/stim-feature-sequences/domain';

import { SequencesFilterDialogComponent } from './sequences-filter-dialog/sequences-filter-dialog.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './sequences.component.html',
  styleUrls: ['./sequences.component.sass']
})
export class SequencesComponent extends BaseListController<Sequence, SequencesState> {

  private static readonly INTRO_SEQUENCE: Sequence = {
    id: -1,
    experimentId: -1,
    name: 'Test',
    size: 50,
    created: new Date().getTime(),
    data: [],
    tags: ['tag1', 'tag2']
  };

  constructor(service: SequencesFacade,
              filterService: ListGroupSortFilterService<Sequence>,
              buttonsAddonService: ListButtonsAddonService,
              router: Router,
              route: ActivatedRoute,
              location: Location,
              private readonly logger: NGXLogger) {
    super(service, filterService, buttonsAddonService, router, route, location);
  }

  handleView(sequence: Sequence) {
    this.logger.info(`Budu zobrazovat sekvenci s id: ${sequence.id}`);
    this._router.navigate([sequence.id], {relativeTo: this._route.parent});
  }

  handleDelete(sequence: Sequence) {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'SEQUENCES.DIALOGS.DELETE.QUESTION',
      confirm: () => {
        self.logger.info(`Budu mazat sequenci s id: ${sequence.id}.`);
        return self._service.delete(sequence.id);
      }
    });
  }

  handleCreateSequence() {
    this._router.navigate(['new'], { relativeTo: this._route.parent});
  }

  protected get introRecord(): Sequence {
    return SequencesComponent.INTRO_SEQUENCE;
  }

  protected get filterDialogComponent(): Type<FilterDialogComponent<Sequence>> {
    return SequencesFilterDialogComponent;
  }

  protected get introStepsComponentName(): string {
    return 'sequences-steps';
  }

  protected get records$(): Observable<Sequence[]> {
    return this.state.pipe(map((state: SequencesState) => state.sequences));
  }
}
