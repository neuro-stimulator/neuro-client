import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ExperimentResultsState } from '@diplomka-frontend/stim-feature-experiment-results/domain';
import { ExperimentResultsService } from '../infrastructure/experiment-results.service';
import * as ExperimentResultssActions from './experiment-results.actions';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  ExperimentResult,
  ExperimentType,
  ResponseObject,
} from '@stechy1/diplomka-share';
import { of } from 'rxjs';

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
      ofType(ExperimentResultssActions.actionExperimentResultsAllRequest),
      switchMap((action) => this.experimentResults.all()),
      // delay(1000),
      map((response: ResponseObject<ExperimentResult[]>) => {
        return ExperimentResultssActions.actionExperimentResultsAllRequestDone({
          experimentResults: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(
          ExperimentResultssActions.actionExperimentResultsAllRequestFail({})
        );
      })
    )
  );
  allWithGhosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ExperimentResultssActions.actionExperimentResultsAllWithGhostRequest
      ),
      withLatestFrom(this.store.select('experimentResults')),
      map(([action, experimentResults]) => [
        action,
        // @ts-ignore
        experimentResults.experimentResults,
      ]),
      switchMap(([action, experimentResults]) => {
        if (experimentResults.length !== 0) {
          return of({ data: experimentResults });
        } else {
          return this.experimentResults.all();
        }
      }),
      map((response: ResponseObject<ExperimentResult[]>) => {
        return ExperimentResultssActions.actionExperimentResultsAllRequestDone({
          experimentResults: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(
          ExperimentResultssActions.actionExperimentResultsAllRequestFail({})
        );
      })
    )
  );

  one$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultssActions.actionExperimentResultsOneRequest),
      switchMap((action) =>
        this.experimentResults.one(action.experimentResultID)
      ),
      map((response: ResponseObject<ExperimentResult>) => {
        return ExperimentResultssActions.actionExperimentResultsOneRequestDone({
          experimentResult: response.data,
        });
      }),
      catchError((errorResponse) => {
        return of(
          ExperimentResultssActions.actionExperimentResultsOneRequestFail({})
        );
      })
    )
  );

  insert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultssActions.actionExperimentResultsInsertRequest),
      switchMap((action) =>
        this.experimentResults.insert(action.experimentResult)
      ),
      map((response: ResponseObject<ExperimentResult>) => {
        this.router.navigate([
          '/experimentResults',
          ExperimentType[response.data.type].toLowerCase(),
          response.data.id,
        ]);
        return ExperimentResultssActions.actionExperimentResultsInsertRequestDone(
          { experimentResult: response.data }
        );
      }),
      catchError((errorResponse) => {
        return of(
          ExperimentResultssActions.actionExperimentResultsInsertRequestFail({})
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultssActions.actionExperimentResultsUpdateRequest),
      switchMap((action) =>
        this.experimentResults.update(action.experimentResult)
      ),
      map((response: ResponseObject<ExperimentResult>) => {
        return ExperimentResultssActions.actionExperimentResultsUpdateRequestDone(
          { experimentResult: response.data }
        );
      }),
      catchError((errorResponse) => {
        return of(
          ExperimentResultssActions.actionExperimentResultsUpdateRequestFail({})
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentResultssActions.actionExperimentResultsDeleteRequest),
      switchMap((action) =>
        this.experimentResults.delete(action.experimentResultID)
      ),
      map((response: ResponseObject<ExperimentResult>) => {
        return ExperimentResultssActions.actionExperimentResultsDeleteRequestDone(
          { experimentResult: response.data }
        );
      }),
      catchError((errorResponse) => {
        return of(
          ExperimentResultssActions.actionExperimentResultsDeleteRequestFail({})
        );
      })
    )
  );

  nameExists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ExperimentResultssActions.actionExperimentResultsNameExistsRequest
      ),
      switchMap((action) =>
        this.experimentResults.nameExists(
          action.name,
          action.experimentResultID
        )
      ),
      map((response: ResponseObject<{ exists: boolean }>) => {
        return ExperimentResultssActions.actionExperimentResultsNameExistsRequestDone(
          { exists: response.data.exists }
        );
      }),
      catchError((errorResponse) => {
        return of(
          ExperimentResultssActions.actionExperimentResultsNameExistsRequestFail(
            {}
          )
        );
      })
    )
  );
}
