import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { Experiment, Sequence } from '@stechy1/diplomka-share';

import { ConfirmDialogComponent, ModalComponent } from 'stim-lib-modal';
import { EntityGroup, ListFilterParameters, ListGroupSortFilterService } from 'stim-lib-list-utils';

import { ListButtonsAddonService } from '../share/list-buttons-addon/list-buttons-addon.service';
import { IntroService } from '../share/intro.service';
import { SequenceService } from './sequence.service';
import { SequencesFilterDialogComponent } from './sequences-filter-dialog/sequences-filter-dialog.component';

@Component({
  selector: 'stim-sequences',
  templateUrl: './sequences.component.html',
  styleUrls: ['./sequences.component.sass']
})
export class SequencesComponent implements OnInit {

  private static readonly INTRO_SEQUENCE: Sequence = {
    id: -1,
    experimentId: -1,
    name: 'Test',
    size: 50,
    created: new Date().getTime(),
    data: [],
    tags: ['tag1', 'tag2']
  };

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  ghosts: any[] = [];

  private _filterRequestSubscription: Subscription;
  private _searchBySubscription: Subscription;
  private _filterParametersChangeSubscription: Subscription;
  private _serviceRecordsSubscription: Subscription;
  private _filterEntitiesSubscription: Subscription;

  constructor(private readonly _service: SequenceService,
              private readonly _filterService: ListGroupSortFilterService<Sequence>,
              private readonly _buttonsAddonService: ListButtonsAddonService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute,
              private readonly _location: Location,
              private readonly _intro: IntroService,
              private readonly logger: NGXLogger) {}

  ngOnInit() {
    this._buttonsAddonService.addonVisible.next(false);
    this.ghosts = this._service.makeGhosts();
    this._filterEntitiesSubscription = this._filterService.subscribeEntities(this._service.records);
    this._service.all()
        .then((count: number) => {
          this.ghosts = [];
          this._showIntro(count === 0);
        });
    this._filterRequestSubscription = this._buttonsAddonService.filterRequest.subscribe(() => this._showFilterDialog());
    this._searchBySubscription = this._buttonsAddonService.searchValue.subscribe((value) => this._handleSearchBy(value));
    this._filterParametersChangeSubscription = this._filterService.filterParametersChange$.subscribe((params: ListFilterParameters) => {
      this._handleFilterParametersChange(params);
    });
    this._serviceRecordsSubscription = this._service.records.subscribe((records) => {
      this._buttonsAddonService.addonVisible.next(records.length !== 0);
    });
  }

  private _showIntro(useIntroRecord: boolean) {
    this._intro.showIntro('sequences-steps', () => {
      if (useIntroRecord) {
        this._service.setIntroRecord(SequencesComponent.INTRO_SEQUENCE);
      }
    }, () => {
      if (useIntroRecord) {
        this._service.clearIntroRecord();
      }
    });
  }

  private _handleFilterParametersChange(params: ListFilterParameters) {
    this._router.navigate([], {queryParams: params, fragment: this._filterService.searchValue, relativeTo: this._route});
  }

  private _handleSearchBy(value: string) {
    const url = this._router.serializeUrl(this._router.createUrlTree(
      [],
      {relativeTo: this._route, queryParams: this._filterService.filterParameters, fragment: value}
    ));
    this._location.go(url);
    this._filterService.filterBy(value);
  }

  private _showFilterDialog() {
    this.modal.showComponent = SequencesFilterDialogComponent;
    this.modal.open();
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

  get sequenceGroups(): EntityGroup<Sequence> {
    return this._filterService.records;
  }

  get hasExperiments() {
    return this._filterService.records && Object.keys(this._filterService.records[0]?.entities)?.length !== 0;
  }
}
