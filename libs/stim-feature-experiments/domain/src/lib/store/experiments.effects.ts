import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Experiment, ExperimentType, Output, ResponseObject, Sequence } from '@stechy1/diplomka-share';

import { ExperimentsService } from '../infrastructure/experiments.service';
import * as ExperimentsActions from './experiments.actions';
import { experimentsFeature, experimentsSelector } from './experiments.reducer';

@Injectable()
export class ExperimentsEffects {
  constructor(private readonly actions$: Actions, private readonly experiments: ExperimentsService, private readonly store: Store, private readonly router: Router) {}

  all$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsAllRequest),
      switchMap(() =>
        this.experiments.all().pipe(
          map((response: ResponseObject<Experiment<Output>[]>) => {
            return ExperimentsActions.actionExperimentsAllRequestDone({
              experiments: response.data,
            });
          }),
          catchError(() => {
            return of(ExperimentsActions.actionExperimentsAllRequestFail());
          })
        )
      )
    )
  );
  allWithGhosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsAllWithGhostRequest),
      withLatestFrom(this.store.select(experimentsSelector)),
      switchMap(([action, experiments]) => {
        let result: Observable<ResponseObject<Experiment<Output>[]>>;
        if (experiments.length !== 0) {
          result = of({ data: experiments });
        } else {
          result = this.experiments.all();
        }
        return result.pipe(
          map((response: ResponseObject<Experiment<Output>[]>) => {
            return ExperimentsActions.actionExperimentsAllRequestDone({
              experiments: response.data,
            });
          }),
          catchError(() => {
            return of(ExperimentsActions.actionExperimentsAllRequestFail());
          })
        );
      })
    )
  );

  one$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsOneRequest),
      switchMap((action) =>
        this.experiments.one(action.experimentID).pipe(
          map((response: ResponseObject<Experiment<Output>>) => {
            return [
              ExperimentsActions.actionExperimentsOneRequestDone({
                experiment: response.data,
              }),
              response.data?.type === ExperimentType.ERP
                ? ExperimentsActions.actionSequencesForExperimentRequest({
                    experiment: response.data,
                  })
                : ExperimentsActions.actionExperimentsNoAction(),
            ];
          }),
          mergeMap((c) => c),
          catchError(() => {
            return of(ExperimentsActions.actionExperimentsOneRequestFail());
          })
        )
      )
    )
  );

  oneFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ExperimentsActions.actionExperimentsOneRequestFail),
        tap(() => this.router.navigate(['/experiments']))
      ),
    { dispatch: false }
  );

  insert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsInsertRequest),
      switchMap((action) =>
        this.experiments.insert(action.experiment).pipe(
          map((response: ResponseObject<Experiment<Output>>) => {
            this.router.navigate(['/experiments', ExperimentType[response.data.type].toLowerCase(), response.data.id]);
            return ExperimentsActions.actionExperimentsInsertRequestDone({
              experiment: response.data,
            });
          }),
          catchError(() => {
            return of(ExperimentsActions.actionExperimentsInsertRequestFail());
          })
        )
      )
    )
  );
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsUpdateRequest),
      mergeMap((action) =>
        this.experiments.update(action.experiment).pipe(
          map((response: ResponseObject<Experiment<Output>>) => {
            return ExperimentsActions.actionExperimentsUpdateRequestDone({
              experiment: response.data,
            });
          }),
          catchError(() => {
            return of(ExperimentsActions.actionExperimentsUpdateRequestFail());
          })
        )
      )
    )
  );
  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsDeleteRequest),
      withLatestFrom(this.store.select(experimentsFeature)),
      mergeMap(([action, experiments]) => {
        let result: Observable<ResponseObject<Experiment<Output>>>;
        if (action.experimentID) {
          result = this.experiments.delete(action.experimentID);
        } else {
          if (!experiments.selectionMode) {
            return EMPTY;
          }

          const selectedExperiments: { [index: number]: boolean } = experiments.selectedExperiments;
          const filteredSelectedExperiments = Object.entries<boolean>(selectedExperiments).filter(([index, selected]) => selected);
          const [selectedIndex, selected] = filteredSelectedExperiments.values().next().value;

          result = this.experiments.delete(+selectedIndex);
        }
        return result.pipe(
          map((response: ResponseObject<Experiment<Output>>) =>
            ExperimentsActions.actionExperimentsDeleteRequestDone({
              experiment: response.data,
            })
          ),
          catchError(() => {
            return of(ExperimentsActions.actionExperimentsDeleteRequestFail());
          })
        );
      })
    );
  });
  deleteDone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsDeleteRequestDone),
      withLatestFrom(this.store.select(experimentsFeature)),
      map(([_, experiments]) => {
        let action;
        if (experiments.selectionMode) {
          action = ExperimentsActions.actionExperimentsDeleteRequest({ experimentID: _.experiment.id });
        } else {
          action = ExperimentsActions.actionExperimentsNoAction();
        }
        return action;
      }),
      delay(250)
    )
  );

  nameExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsNameExistsRequest),
      withLatestFrom(this.store.select(experimentsFeature)),
      switchMap(([action, experiments]) =>
        this.experiments.nameExists(action.name, experiments.selectedExperiment.experiment.id).pipe(
          map((response: ResponseObject<{ exists: boolean }>) => {
            return ExperimentsActions.actionExperimentsNameExistsRequestDone({
              exists: response.data.exists,
            });
          }),
          catchError(() => {
            return of(ExperimentsActions.actionExperimentsNameExistsRequestFail());
          })
        )
      )
    )
  );

  sequencesForExperiment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionSequencesForExperimentRequest),
      switchMap((action) =>
        this.experiments.sequencesForExperiment(action.experiment).pipe(
          map((response: ResponseObject<Sequence[]>) => {
            return ExperimentsActions.actionSequencesForExperimentRequestDone({
              sequences: response.data,
            });
          }),
          catchError(() => {
            return of(ExperimentsActions.actionSequencesForExperimentRequestFail());
          })
        )
      )
    )
  );

  sequenceFromExperiment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsGenerateSequenceFromNameAndSizeRequest),
      withLatestFrom(this.store.select(experimentsFeature)),
      switchMap(([action, experiments]) =>
        this.experiments.sequenceFromExperiment(experiments.selectedExperiment.experiment.id, action.name, action.size).pipe(
          map((response: ResponseObject<Sequence>) => {
            return ExperimentsActions.actionExperimentsGenerateSequenceFromNameAndSizeRequestDone({ sequence: response.data });
          })
        )
      )
    )
  );
}
