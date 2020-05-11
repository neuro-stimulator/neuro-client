import { Component, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NGXLogger } from 'ngx-logger';

import { Sequence } from '@stechy1/diplomka-share';

import { ConfirmDialogComponent} from 'stim-lib-modal';
import { ListGroupSortFilterService } from 'stim-lib-list-utils';

import { ListButtonsAddonService } from '../share/list-buttons-addon/list-buttons-addon.service';
import { IntroService } from '../share/intro.service';
import { BaseListController } from '../share/base-list.controller';
import { SequenceService } from './sequence.service';
import { FilterDialogComponent } from '../share/filter-dialog/filter-dialog.component';
import { SequencesFilterDialogComponent } from './sequences-filter-dialog/sequences-filter-dialog.component';

@Component({
  selector: 'stim-sequences',
  templateUrl: './sequences.component.html',
  styleUrls: ['./sequences.component.sass']
})
export class SequencesComponent extends BaseListController<Sequence> {

  private static readonly INTRO_SEQUENCE: Sequence = {
    id: -1,
    experimentId: -1,
    name: 'Test',
    size: 50,
    created: new Date().getTime(),
    data: [],
    tags: ['tag1', 'tag2']
  };

  constructor(service: SequenceService,
              filterService: ListGroupSortFilterService<Sequence>,
              buttonsAddonService: ListButtonsAddonService,
              router: Router,
              route: ActivatedRoute,
              location: Location,
              intro: IntroService,
              private readonly logger: NGXLogger) {
    super(service, filterService, buttonsAddonService, router, route, location, intro);
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
}
