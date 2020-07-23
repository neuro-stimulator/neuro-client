import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Sequence, ResponseObject, Experiment } from '@stechy1/diplomka-share';

import { SequencesService } from '../infrastructure/sequences.service';
import * as SequencesActions from './sequences.actions';
import { SequencesState } from './sequences.type';

@Injectable()
export class SequencesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly sequences: SequencesService,
    private readonly store: Store<SequencesState>,
    private readonly router: Router
  ) {}

  all$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesAllRequest),
      switchMap((action) => this.sequences.all()),
      // delay(1000),
      map((response: ResponseObject<Sequence[]>) => {
        return SequencesActions.actionSequencesAllRequestDone({
          sequences: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(SequencesActions.actionSequencesAllRequestFail({}));
      })
    )
  );
  allWithGhosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesAllWithGhostRequest),
      withLatestFrom(this.store.select('sequences')),
      // @ts-ignore
      map(([action, sequences]) => [action, sequences.sequences]),
      switchMap(([action, sequences]) => {
        if (sequences.length !== 0) {
          return of({ data: sequences });
        } else {
          return this.sequences.all();
        }
      }),
      map((response: ResponseObject<Sequence[]>) => {
        return SequencesActions.actionSequencesAllRequestDone({
          sequences: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(SequencesActions.actionSequencesAllRequestFail({}));
      })
    )
  );

  one$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesOneRequest),
      switchMap((action) => this.sequences.one(action.sequenceID)),
      map((response: ResponseObject<Sequence>) => {
        return SequencesActions.actionSequencesOneRequestDone({
          sequence: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(SequencesActions.actionSequencesOneRequestFail({}));
      })
    )
  );

  insert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesInsertRequest),
      switchMap((action) => this.sequences.insert(action.sequence)),
      map((response: ResponseObject<Sequence>) => {
        this.router.navigate(['/sequences', response.data.id]);
        return SequencesActions.actionSequencesInsertRequestDone({
          sequence: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(SequencesActions.actionSequencesInsertRequestFail({}));
      })
    )
  );
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesUpdateRequest),
      switchMap((action) => this.sequences.update(action.sequence)),
      map((response: ResponseObject<Sequence>) => {
        return SequencesActions.actionSequencesUpdateRequestDone({
          sequence: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(SequencesActions.actionSequencesUpdateRequestFail({}));
      })
    )
  );
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesDeleteRequest),
      switchMap((action) => this.sequences.delete(action.sequenceID)),
      map((response: ResponseObject<Sequence>) => {
        return SequencesActions.actionSequencesDeleteRequestDone({
          sequence: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(SequencesActions.actionSequencesDeleteRequestFail({}));
      })
    )
  );

  nameExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesNameExistsRequest),
      withLatestFrom(this.store.select('sequences')),
      switchMap(([action, sequences]) =>
        this.sequences.nameExists(
          action.name,
          // @ts-ignoreX
          sequences.selectedSequence.sequence.id
        )
      ),
      map((response: ResponseObject<{ exists: boolean }>) => {
        return SequencesActions.actionSequencesNameExistsRequestDone({
          exists: response.data.exists,
        });
      }),
      catchError((errorResponse) => {
        return of(SequencesActions.actionSequencesNameExistsRequestFail({}));
      })
    )
  );

  // Sequence specific actions

  sequenceGenerate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesGenerateRequest),
      withLatestFrom(this.store.select('sequences')),
      // @ts-ignore
      switchMap(([action, sequences]: [any, SequencesState]) =>
        this.sequences.generaceSequence(
          sequences.selectedSequence.sequence.experimentId,
          sequences.selectedSequence.sequence.size
        )
      ),
      map((response: ResponseObject<number[]>) => {
        return SequencesActions.actionSequencesGenerateDone({
          sequenceData: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(SequencesActions.actionSequencesGenerateFail({}));
      })
    )
  );

  sequenceFromNameAndSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesInsertRequestFast),
      switchMap((action) =>
        this.sequences.fromNameAndSize(
          action.experimentID,
          action.name,
          action.size
        )
      ),
      map((response: ResponseObject<Sequence>) => {
        return SequencesActions.actionSequencesInsertRequestDone({
          sequence: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(SequencesActions.actionSequencesInsertRequestFail({}));
      })
    )
  );

  experimentsAsSequenceProviders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SequencesActions.actionSequencesExperimentsAsSequenceSourceRequest
      ),
      switchMap((action) => this.sequences.experimentsAsSequenceSource()),
      map((response: ResponseObject<Experiment[]>) => {
        return SequencesActions.actionSequencesExperimentsAsSequenceSourceRequestDone(
          { experiments: response.data }
        );
      }),
      catchError((errorResponse) => {
        return of(
          SequencesActions.actionSequencesExperimentsAsSequenceSourceRequestFail(
            {}
          )
        );
      })
    )
  );

  saveSelectedExperiment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SequencesActions.actionSequencesUpdateRequest,
        SequencesActions.actionSequencesGenerateRequest,
        SequencesActions.actionSequencesExperimentsAsSequenceSourceRequestDone
      ),
      map((action) => {
        return SequencesActions.actionSequencesUpdateSelectedExperiment({});
      })
    )
  );
}
