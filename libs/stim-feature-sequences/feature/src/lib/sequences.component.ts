import { Component, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NGXLogger } from 'ngx-logger';

import { Sequence } from '@stechy1/diplomka-share';

import { ConfirmDialogArgs, ConfirmDialogComponent } from '@diplomka-frontend/stim-lib-modal';
import { ListGroupSortFilterService } from '@diplomka-frontend/stim-lib-list-utils';
import { FilterDialogComponent } from '@diplomka-frontend/stim-lib-ui';
import { ListButtonsAddonService, BaseListComponent } from '@diplomka-frontend/stim-lib-ui';
import { SequencesFacade, SequencesState } from '@diplomka-frontend/stim-feature-sequences/domain';
import { NavigationFacade } from '@diplomka-frontend/stim-feature-navigation/domain';
import { AliveCheckerFacade } from '@diplomka-frontend/stim-lib-connection';

import { SequencesFilterDialogComponent } from './sequences-filter-dialog/sequences-filter-dialog.component';

@Component({
  templateUrl: './sequences.component.html',
  styleUrls: ['./sequences.component.sass'],
})
export class SequencesComponent extends BaseListComponent<Sequence, SequencesState> {
  private static readonly INTRO_SEQUENCE: Sequence = {
    id: -1,
    experimentId: -1,
    name: 'Test',
    size: 50,
    created: new Date().getTime(),
    data: [],
    tags: ['tag1', 'tag2'],
  };

  constructor(
    service: SequencesFacade,
    filterService: ListGroupSortFilterService<Sequence>,
    navigation: NavigationFacade,
    connection: AliveCheckerFacade,
    buttonsAddonService: ListButtonsAddonService,
    router: Router,
    route: ActivatedRoute,
    location: Location,
    private readonly logger: NGXLogger
  ) {
    super(service, filterService, navigation, connection, buttonsAddonService, router, route, location);
  }

  handleView(sequence: Sequence) {
    this.logger.info(`Budu zobrazovat sekvenci s id: ${sequence.id}`);
    this._router.navigate([sequence.id], { relativeTo: this._route.parent });
  }

  handleDelete(sequence: Sequence) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open<ConfirmDialogArgs>({
      message: 'SEQUENCES.DIALOGS.DELETE.QUESTION',
      confirm: () => {
        self.logger.info(`Budu mazat sequenci s id: ${sequence.id}.`);
        return self._facade.delete(sequence.id);
      },
    });
  }

  handleCreateSequence() {
    this._router.navigate(['new'], { relativeTo: this._route.parent });
  }

  handleSelect(sequence: Sequence) {
    this._facade.selectEntity(sequence);
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

  protected get selectionMode$(): Observable<boolean> {
    return this.state.pipe(map((state: SequencesState) => state.selectionMode));
  }
}
