import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  flatMap,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

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
import { experimentsFeature, experimentsSelector } from './experiments.reducer';

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
      withLatestFrom(this.store.select(experimentsSelector)),
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
      }),
      flatMap((c) => c),
      catchError((errorResponse) => {
        return of(ExperimentsActions.actionExperimentsOneRequestFail({}));
      })
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
  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsDeleteRequest),
      withLatestFrom(this.store.select(experimentsFeature)),
      switchMap(([action, experiments]) => {
        if (action.experimentID) {
          return this.experiments.delete(action.experimentID);
        } else {
          if (!experiments.selectionMode) {
            return EMPTY;
          }

          const selectedExperiments: { [index: number]: boolean } =
            experiments.selectedExperiments;
          const filteredSelectedExperiments = Object.entries<boolean>(
            selectedExperiments
          ).filter(([index, selected]) => selected);
          const [
            selectedIndex,
            selected,
          ] = filteredSelectedExperiments.values().next().value;

          return this.experiments.delete(+selectedIndex);
        }
      }),
      map((response: ResponseObject<Experiment>) =>
        ExperimentsActions.actionExperimentsDeleteRequestDone({
          experiment: response.data,
        })
      ),
      catchError((errorResponse) => {
        return of(ExperimentsActions.actionExperimentsDeleteRequestFail({}));
      })
    );
  });
  deleteDone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsDeleteRequestDone),
      withLatestFrom(this.store.select(experimentsFeature)),
      map(([action, experiments]) => {
        if (experiments.selectionMode) {
          setTimeout(
            () =>
              this.store.dispatch(
                ExperimentsActions.actionExperimentsDeleteRequest({})
              ),
            250
          );
        }
        return ExperimentsActions.actionExperimentsNoAction({});
      })
    )
  );

  nameExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.actionExperimentsNameExistsRequest),
      withLatestFrom(this.store.select(experimentsFeature)),
      switchMap(([action, experiments]) =>
        this.experiments.nameExists(
          action.name,
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
      withLatestFrom(this.store.select(experimentsFeature)),
      switchMap(([action, experiments]) =>
        this.experiments.sequenceFromExperiment(
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
}
