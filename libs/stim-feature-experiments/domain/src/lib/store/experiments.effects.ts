import { Injectable } from '@angular/core';
import {
  catchError,
  flatMap,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
  Experiment,
  ExperimentType,
  ResponseObject,
  Sequence,
} from '@stechy1/diplomka-share';

import { ExperimentsService } from '../infrastructure/experiments.service';
import * as ExperimentsActions from './experiments.actions';
import { ExperimentsState } from './experiments.type';

@Injectable()
export class ExperimentsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly experiments: ExperimentsService,
    private readonly store: Store<ExperimentsState>,
    private readonly router: Router
  ) {}

  all$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsAllRequest),
      switchMap((action) => this.experiments.all()),
      // delay(1000),
      map((response: ResponseObject<Experiment[]>) => {
        return ExperimentsActions.actionExperimentsAllRequestDone({
          experiments: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(ExperimentsActions.actionExperimentsAllRequestFail({}));
      })
    )
  );
  allWithGhosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsAllWithGhostRequest),
      withLatestFrom(this.store.select('experiments')),
      // @ts-ignore
      map(([action, experiments]) => [action, experiments.experiments]),
      switchMap(([action, experiments]) => {
        if (experiments.length !== 0) {
          return of({ data: experiments });
        } else {
          return this.experiments.all();
        }
      }),
      map((response: ResponseObject<Experiment[]>) => {
        return ExperimentsActions.actionExperimentsAllRequestDone({
          experiments: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(ExperimentsActions.actionExperimentsAllRequestFail({}));
      })
    )
  );

  one$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsOneRequest),
      switchMap((action) => this.experiments.one(action.experimentID)),
      map((response: ResponseObject<Experiment>) => {
        return [
          ExperimentsActions.actionExperimentsOneRequestDone({
            experiment: response.data,
          }),
          response.data?.type === ExperimentType.ERP
            ? ExperimentsActions.actionSequencesForExperimentRequest({
                experiment: response.data,
              })
            : ExperimentsActions.actionExperimentsNoAction({}),
        ];
        // return ExperimentsActions.actionExperimentsOneRequestDone({
        //   experiment: response.data,
        // });
      }),
      flatMap((c) => c),
      catchError((errorResponse) => {
        return of(ExperimentsActions.actionExperimentsOneRequestFail({}));
      })
    )
  );

  insert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsInsertRequest),
      switchMap((action) => this.experiments.insert(action.experiment)),
      map((response: ResponseObject<Experiment>) => {
        this.router.navigate([
          '/experiments',
          ExperimentType[response.data.type].toLowerCase(),
          response.data.id,
        ]);
        return ExperimentsActions.actionExperimentsInsertRequestDone({
          experiment: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(ExperimentsActions.actionExperimentsInsertRequestFail({}));
      })
    )
  );
  // afterInsertRedirect = createEffect(() => this.actions$.pipe(
  //   ofType(ExperimentsActions.actionExperimentsInsertRequestDone),
  //   tap((action) => )
  // ));
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsUpdateRequest),
      switchMap((action) => this.experiments.update(action.experiment)),
      map((response: ResponseObject<Experiment>) => {
        return ExperimentsActions.actionExperimentsUpdateRequestDone({
          experiment: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(ExperimentsActions.actionExperimentsUpdateRequestFail({}));
      })
    )
  );
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsDeleteRequest),
      switchMap((action) => this.experiments.delete(action.experimentID)),
      map((response: ResponseObject<Experiment>) => {
        return ExperimentsActions.actionExperimentsDeleteRequestDone({
          experiment: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(ExperimentsActions.actionExperimentsDeleteRequestFail({}));
      })
    )
  );

  nameExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsNameExistsRequest),
      withLatestFrom(this.store.select('experiments')),
      switchMap(([action, experiments]) =>
        this.experiments.nameExists(
          action.name,
          // @ts-ignore
          experiments.selectedExperiment.experiment.id
        )
      ),
      map((response: ResponseObject<{ exists: boolean }>) => {
        return ExperimentsActions.actionExperimentsNameExistsRequestDone({
          exists: response.data.exists,
        });
      }),
      catchError((errorResponse) => {
        return of(
          ExperimentsActions.actionExperimentsNameExistsRequestFail({})
        );
      })
    )
  );

  sequencesForExperiment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionSequencesForExperimentRequest),
      // @ts-ignore
      switchMap((action) =>
        this.experiments.sequencesForExperiment(action.experiment)
      ),
      map((response: ResponseObject<Sequence[]>) => {
        return ExperimentsActions.actionSequencesForExperimentRequestDone({
          sequences: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(
          ExperimentsActions.actionSequencesForExperimentRequestFail({})
        );
      })
    )
  );

  sequenceFromExperiment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ExperimentsActions.actionExperimentsGenerateSequenceFromNameAndSizeRequest
      ),
      withLatestFrom(this.store.select('experiments')),
      switchMap(([action, experiments]) =>
        this.experiments.sequenceFromExperiment(
          // @ts-ignore
          experiments.selectedExperiment.experiment.id,
          action.name,
          action.size
        )
      ),
      map((response: ResponseObject<Sequence>) => {
        return ExperimentsActions.actionExperimentsGenerateSequenceFromNameAndSizeRequestDone(
          { sequence: response.data }
        );
      })
    )
  );

  deleteSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsDeleteSelected),
      withLatestFrom(this.store.select('experiments')),
      switchMap(([action, experiments]) => {
        // @ts-ignore
        const selectedExperiments = experiments.selectedExperiments;

        return of(
          Object.entries<boolean>(selectedExperiments)
            .filter(([index, selected]) => selected)
            .map(([index, selected]) =>
              ExperimentsActions.actionExperimentsDeleteRequest({
                experimentID: +index,
              })
            )
        );
      }),
      mergeMap((c) => c)
    )
  );
}
