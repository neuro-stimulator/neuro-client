import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Sequence, ResponseObject, Experiment, Output } from '@stechy1/diplomka-share';

import { SequencesService } from '../infrastructure/sequences.service';
import * as SequencesActions from './sequences.actions';
import { SequencesState } from './sequences.type';
import { sequencesFeature, sequencesSelector } from './sequences.reducer';

@Injectable()
export class SequencesEffects {
  constructor(private readonly actions$: Actions, private readonly sequences: SequencesService, private readonly store: Store, private readonly router: Router) {}

  all$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesAllRequest),
      switchMap(() =>
        this.sequences.all().pipe(
          map((response: ResponseObject<Sequence[]>) => {
            return SequencesActions.actionSequencesAllRequestDone({
              sequences: response.data,
            });
          }),
          catchError(() => {
            return of(SequencesActions.actionSequencesAllRequestFail());
          })
        )
      )
    )
  );
  allWithGhosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesAllWithGhostRequest),
      withLatestFrom(this.store.select(sequencesSelector)),
      switchMap(([action, sequences]) => {
        let result: Observable<ResponseObject<Sequence[]>>;
        if (sequences.length !== 0) {
          result = of({ data: sequences });
        } else {
          result = this.sequences.all();
        }
        return result.pipe(
          map((response: ResponseObject<Sequence[]>) => {
            return SequencesActions.actionSequencesAllRequestDone({
              sequences: response.data,
            });
          }),
          catchError(() => {
            return of(SequencesActions.actionSequencesAllRequestFail());
          })
        );
      })
    )
  );

  one$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesOneRequest),
      switchMap((action) =>
        this.sequences.one(action.sequenceID).pipe(
          map((response: ResponseObject<Sequence>) => {
            return SequencesActions.actionSequencesOneRequestDone({
              sequence: response.data,
            });
          }),
          catchError(() => {
            return of(SequencesActions.actionSequencesOneRequestFail());
          })
        )
      )
    )
  );

  insert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesInsertRequest),
      switchMap((action) =>
        this.sequences.insert(action.sequence).pipe(
          map((response: ResponseObject<Sequence>) => {
            this.router.navigate(['/sequences', response.data.id]);
            return SequencesActions.actionSequencesInsertRequestDone({
              sequence: response.data,
            });
          }),
          catchError(() => {
            return of(SequencesActions.actionSequencesInsertRequestFail());
          })
        )
      )
    )
  );
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesUpdateRequest),
      mergeMap((action) =>
        this.sequences.update(action.sequence).pipe(
          map((response: ResponseObject<Sequence>) => {
            return SequencesActions.actionSequencesUpdateRequestDone({
              sequence: response.data,
            });
          }),
          catchError(() => {
            return of(SequencesActions.actionSequencesUpdateRequestFail());
          })
        )
      )
    )
  );
  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SequencesActions.actionSequencesDeleteRequest),
      withLatestFrom(this.store.select(sequencesFeature)),
      mergeMap(([action, sequences]) => {
        let result: Observable<ResponseObject<Sequence>>;
        if (action.sequenceID) {
          result = this.sequences.delete(action.sequenceID);
        } else {
          if (!sequences.selectionMode) {
            return EMPTY;
          }

          const selectedSequences: { [index: number]: boolean } = sequences.selectedSequences;
          const filteredSelectedSequences = Object.entries<boolean>(selectedSequences).filter(([index, selected]) => selected);
          const [selectedIndex, selected] = filteredSelectedSequences.values().next().value;

          result = this.sequences.delete(+selectedIndex);
        }
        return result.pipe(
          map((response: ResponseObject<Sequence>) =>
            SequencesActions.actionSequencesDeleteRequestDone({
              sequence: response.data,
            })
          ),
          catchError(() => {
            return of(SequencesActions.actionSequencesDeleteRequestFail());
          })
        );
      })
    );
  });
  deleteDone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesDeleteRequestDone),
      withLatestFrom(this.store.select(sequencesFeature)),
      map(([_, sequences]) => {
        let action;
        if (sequences.selectionMode) {
          action = SequencesActions.actionSequencesDeleteRequest({ sequenceID: _.sequence.id });
        } else {
          action = SequencesActions.actionSequencesNoAction();
        }
        return action;
      }),
      delay(250)
    )
  );

  nameExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesNameExistsRequest),
      withLatestFrom(this.store.select(sequencesFeature)),
      switchMap(([action, sequences]) =>
        this.sequences.nameExists(action.name, sequences.selectedSequence.sequence.id).pipe(
          map((response: ResponseObject<{ exists: boolean }>) => {
            return SequencesActions.actionSequencesNameExistsRequestDone({
              exists: response.data.exists,
            });
          }),
          catchError(() => {
            return of(SequencesActions.actionSequencesNameExistsRequestFail());
          })
        )
      )
    )
  );

  // Sequence specific actions

  sequenceGenerate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesGenerateRequest),
      withLatestFrom(this.store.select(sequencesFeature)),
      switchMap(([action, sequences]: [any, SequencesState]) =>
        this.sequences.generaceSequence(sequences.selectedSequence.sequence.experimentId, sequences.selectedSequence.sequence.size).pipe(
          map((response: ResponseObject<number[]>) => {
            return SequencesActions.actionSequencesGenerateDone({
              sequenceData: response.data,
            });
          }),
          catchError(() => {
            return of(SequencesActions.actionSequencesGenerateFail());
          })
        )
      )
    )
  );

  sequenceFromNameAndSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesInsertRequestFast),
      switchMap((action) =>
        this.sequences.fromNameAndSize(action.experimentID, action.name, action.size).pipe(
          map((response: ResponseObject<Sequence>) => {
            return SequencesActions.actionSequencesInsertRequestDone({
              sequence: response.data,
            });
          }),
          catchError(() => {
            return of(SequencesActions.actionSequencesInsertRequestFail());
          })
        )
      )
    )
  );

  experimentsAsSequenceProviders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SequencesActions.actionSequencesExperimentsAsSequenceSourceRequest),
      switchMap((action) =>
        this.sequences.experimentsAsSequenceSource().pipe(
          map((response: ResponseObject<Experiment<Output>[]>) => {
            return SequencesActions.actionSequencesExperimentsAsSequenceSourceRequestDone({ experiments: response.data });
          }),
          catchError(() => {
            return of(SequencesActions.actionSequencesExperimentsAsSequenceSourceRequestFail());
          })
        )
      )
    )
  );

  saveSelectedExperiment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SequencesActions.actionSequencesUpdateRequest,
        SequencesActions.actionSequencesGenerateRequest,
        SequencesActions.actionSequencesExperimentsAsSequenceSourceRequestDone
      ),
      map(() => {
        return SequencesActions.actionSequencesUpdateSelectedExperiment();
      })
    )
  );
}
