import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { Sequence } from '@stechy1/diplomka-share';

import { ConfirmDialogComponent } from '../share/modal/confirm/confirm-dialog.component';
import { ModalComponent } from '../share/modal/modal.component';
import { SequenceService } from './sequence.service';
import { IntroService } from '../share/intro.service';

@Component({
  selector: 'app-sequences',
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
  sequences: Observable<Sequence[]>;

  constructor(private readonly _service: SequenceService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute,
              private readonly _intro: IntroService,
              private readonly logger: NGXLogger) {}

  ngOnInit() {
    this.ghosts = this._service.makeGhosts();
    this.sequences = this._service.records;
    this._service.all()
        .then((count: number) => {
          this.ghosts = [];
          this._showIntro(count === 0);
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

  handleView(sequence: Sequence) {
    this.logger.info(`Budu zobrazovat sekvenci s id: ${sequence.id}`);
    this._router.navigate([sequence.id], {relativeTo: this._route});
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
    this._router.navigate(['new'], { relativeTo: this._route});
  }
}
