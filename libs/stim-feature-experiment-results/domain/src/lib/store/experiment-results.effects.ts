import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { catchError, delay, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { ExperimentResult, IOEvent, ResponseObject } from '@stechy1/diplomka-share';

import { SelectedEntities } from '@diplomka-frontend/stim-lib-list-utils';

import { ExperimentResultsService } from '../infrastructure/experiment-results.service';
import * as ExperimentResultsActions from './experiment-results.actions';
import { experimentResultsFeature, experimentResultsSelector } from './experiment-results.reducer';

@Injectable()
export class ExperimentResultssEffects {
  constructor(private readonly actions$: Actions, private readonly experimentResults: ExperimentResultsService, private readonly store: Store, private readonly router: Router) {}

  all$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsAllRequest),
      switchMap(() =>
        this.experimentResults.all().pipe(
          map((response: ResponseObject<ExperimentResult[]>) => {
            return ExperimentResultsActions.actionExperimentResultsAllRequestDone({
              experimentResults: response.data,
            });
          }),
          catchError(() => {
            return of(ExperimentResultsActions.actionExperimentResultsAllRequestFail());
          })
        )
      )
    )
  );
  allWithGhosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsAllWithGhostRequest),
      withLatestFrom(this.store.select(experimentResultsSelector)),
      switchMap(([action, experimentResults]) => {
        let results: Observable<ResponseObject<ExperimentResult[]>>;
        if (experimentResults.length !== 0) {
          results = of({ data: experimentResults });
        } else {
          results = this.experimentResults.all();
        }
        return results.pipe(
          map((response: ResponseObject<ExperimentResult[]>) => {
            return ExperimentResultsActions.actionExperimentResultsAllRequestDone({
              experimentResults: response.data,
            });
          }),
          catchError(() => {
            return of(ExperimentResultsActions.actionExperimentResultsAllRequestFail());
          })
        );
      })
    )
  );

  one$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsOneRequest),
      switchMap((action) =>
        this.experimentResults.one(action.experimentResultID).pipe(
          map((response: ResponseObject<ExperimentResult>) => {
            return ExperimentResultsActions.actionExperimentResultsOneRequestDone({
              experimentResult: response.data,
            });
          }),
          catchError(() => {
            return of(ExperimentResultsActions.actionExperimentResultsOneRequestFail());
          })
        )
      )
    )
  );

  resultData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsOneRequestDone),
      switchMap((action) =>
        this.experimentResults.resultData(action.experimentResult).pipe(
          map((response: ResponseObject<IOEvent[]>) =>
            ExperimentResultsActions.actionExperimentResultsDataDone({
              data: response.data,
            })
          ),
          catchError(() => {
            return of(ExperimentResultsActions.actionExperimentResultsDataFail());
          })
        )
      )
    );
  });

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsUpdateRequest),
      mergeMap((action) =>
        this.experimentResults.update(action.experimentResult).pipe(
          map((response: ResponseObject<ExperimentResult>) => {
            return ExperimentResultsActions.actionExperimentResultsUpdateRequestDone({ experimentResult: response.data });
          }),
          catchError(() => {
            return of(ExperimentResultsActions.actionExperimentResultsUpdateRequestFail());
          })
        )
      )
    )
  );

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsDeleteRequest),
      withLatestFrom(this.store.select(experimentResultsFeature)),
      mergeMap(([action, experimentResults]) => {
        let result: Observable<ResponseObject<ExperimentResult>>;
        if (action.experimentResultID) {
          result = this.experimentResults.delete(action.experimentResultID);
        } else {
          if (!experimentResults.selectionMode) {
            return EMPTY;
          }

          const selectedExperimentResults: SelectedEntities = experimentResults.selectedExperimentResults;
          const filteredSelectedExperiments = Object.entries<boolean>(selectedExperimentResults).filter(([index, selected]) => selected);
          const [selectedIndex, selected] = filteredSelectedExperiments.values().next().value;

          result = this.experimentResults.delete(+selectedIndex);
        }
        return result.pipe(
          map((response: ResponseObject<ExperimentResult>) =>
            ExperimentResultsActions.actionExperimentResultsDeleteRequestDone({
              experimentResult: response.data,
            })
          ),
          catchError(() => {
            return of(ExperimentResultsActions.actionExperimentResultsDeleteRequestFail());
          })
        );
      })
    );
  });
  deleteDone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsDeleteRequestDone),
      withLatestFrom(this.store.select(experimentResultsFeature)),
      map(([_, experimentResults]) => {
        let action;
        if (experimentResults.selectionMode) {
          action = ExperimentResultsActions.actionExperimentResultsDeleteRequest({});
        } else {
          action = ExperimentResultsActions.actionExperimentResultsNoAction();
        }
        return action;
      }),
      delay(250)
    )
  );

  nameExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsNameExistsRequest),
      switchMap((action) =>
        this.experimentResults.nameExists(action.name, action.experimentResultID).pipe(
          map((response: ResponseObject<{ exists: boolean }>) => {
            return ExperimentResultsActions.actionExperimentResultsNameExistsRequestDone({ exists: response.data.exists });
          }),
          catchError(() => {
            return of(ExperimentResultsActions.actionExperimentResultsNameExistsRequestFail());
          })
        )
      )
    )
  );
}
