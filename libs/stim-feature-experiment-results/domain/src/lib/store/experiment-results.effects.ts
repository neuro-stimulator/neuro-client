import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { ExperimentResult, IOEvent, ResponseObject } from '@stechy1/diplomka-share';

import { ExperimentResultsState } from '@diplomka-frontend/stim-feature-experiment-results/domain';
import { SelectedEntities } from '@diplomka-frontend/stim-lib-list-utils';

import { ExperimentResultsService } from '../infrastructure/experiment-results.service';
import * as ExperimentResultsActions from './experiment-results.actions';
import { experimentResultsFeature, experimentResultsSelector } from './experiment-results.reducer';

@Injectable()
export class ExperimentResultssEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly experimentResults: ExperimentResultsService,
    private readonly store: Store<ExperimentResultsState>,
    private readonly router: Router
  ) {}

  all$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsAllRequest),
      switchMap((action) => this.experimentResults.all()),
      // delay(1000),
      map((response: ResponseObject<ExperimentResult[]>) => {
        return ExperimentResultsActions.actionExperimentResultsAllRequestDone({
          experimentResults: response.data,
        });
      }),
      catchError((errorResponse: unknown) => {
        return of(ExperimentResultsActions.actionExperimentResultsAllRequestFail());
      })
    )
  );
  allWithGhosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsAllWithGhostRequest),
      withLatestFrom(this.store.select(experimentResultsSelector)),
      switchMap(([action, experimentResults]) => {
        if (experimentResults.length !== 0) {
          return of({ data: experimentResults });
        } else {
          return this.experimentResults.all();
        }
      }),
      map((response: ResponseObject<ExperimentResult[]>) => {
        return ExperimentResultsActions.actionExperimentResultsAllRequestDone({
          experimentResults: response.data,
        });
      }),
      catchError((errorResponse: unknown) => {
        return of(ExperimentResultsActions.actionExperimentResultsAllRequestFail());
      })
    )
  );

  one$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsOneRequest),
      switchMap((action) => this.experimentResults.one(action.experimentResultID)),
      map((response: ResponseObject<ExperimentResult>) => {
        return ExperimentResultsActions.actionExperimentResultsOneRequestDone({
          experimentResult: response.data,
        });
      }),
      catchError((errorResponse: unknown) => {
        return of(ExperimentResultsActions.actionExperimentResultsOneRequestFail());
      })
    )
  );

  resultData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsOneRequestDone),
      switchMap((action) => this.experimentResults.resultData(action.experimentResult)),
      map((response: ResponseObject<IOEvent[]>) =>
        ExperimentResultsActions.actionExperimentResultsDataDone({
          data: response.data,
        })
      ),
      catchError((errorResponse: unknown) => {
        return of(ExperimentResultsActions.actionExperimentResultsDataFail());
      })
    );
  });

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsUpdateRequest),
      switchMap((action) => this.experimentResults.update(action.experimentResult)),
      map((response: ResponseObject<ExperimentResult>) => {
        return ExperimentResultsActions.actionExperimentResultsUpdateRequestDone({ experimentResult: response.data });
      }),
      catchError((errorResponse: unknown) => {
        return of(ExperimentResultsActions.actionExperimentResultsUpdateRequestFail());
      })
    )
  );

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsDeleteRequest),
      withLatestFrom(this.store.select(experimentResultsFeature)),
      switchMap(([action, experimentResults]) => {
        if (action.experimentResultID) {
          return this.experimentResults.delete(action.experimentResultID);
        } else {
          if (!experimentResults.selectionMode) {
            return EMPTY;
          }

          const selectedExperimentResults: SelectedEntities = experimentResults.selectedExperimentResults;
          const filteredSelectedExperiments = Object.entries<boolean>(selectedExperimentResults).filter(([index, selected]) => selected);
          const [selectedIndex, selected] = filteredSelectedExperiments.values().next().value;

          return this.experimentResults.delete(+selectedIndex);
        }
      }),
      map((response: ResponseObject<ExperimentResult>) =>
        ExperimentResultsActions.actionExperimentResultsDeleteRequestDone({
          experimentResult: response.data,
        })
      ),
      catchError((errorResponse: unknown) => {
        return of(ExperimentResultsActions.actionExperimentResultsDeleteRequestFail());
      })
    );
  });
  deleteDone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsDeleteRequestDone),
      withLatestFrom(this.store.select(experimentResultsFeature)),
      map(([action, experimentResults]) => {
        if (experimentResults.selectionMode) {
          setTimeout(() => this.store.dispatch(ExperimentResultsActions.actionExperimentResultsDeleteRequest({ experimentResultID: action.experimentResult.id })), 250);
        }
        return ExperimentResultsActions.actionExperimentResultsNoAction();
      })
    )
  );

  nameExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultsActions.actionExperimentResultsNameExistsRequest),
      switchMap((action) => this.experimentResults.nameExists(action.name, action.experimentResultID)),
      map((response: ResponseObject<{ exists: boolean }>) => {
        return ExperimentResultsActions.actionExperimentResultsNameExistsRequestDone({ exists: response.data.exists });
      }),
      catchError((errorResponse: unknown) => {
        return of(ExperimentResultsActions.actionExperimentResultsNameExistsRequestFail());
      })
    )
  );
}
