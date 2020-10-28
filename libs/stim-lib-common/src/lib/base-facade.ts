import { BaseRecord } from '@diplomka-frontend/stim-lib-common';
import { ActionCreator, DefaultProjectorFn, MemoizedSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export interface BaseActions {
  allWithGhosts: { action: ActionCreator<any, any> };
  all: { action: ActionCreator<any, any> };
  one: { action: ActionCreator<any, any>; parameterName: string };
  insert: { action: ActionCreator<any, any>; parameterName: string };
  update: { action: ActionCreator<any, any>; parameterName: string };
  delete: { action: ActionCreator<any, any>; parameterName: string };
  select?: { action: ActionCreator<any, any>; parameterName: string };
  selectAll?: { action: ActionCreator<any, any> };
  selectNone?: { action: ActionCreator<any, any> };
}

export abstract class BaseFacade<T extends BaseRecord, S> {
  protected constructor(protected readonly store: Store) {}

  public get state(): Observable<S> {
    return this.store.select(this.featureSelector);
  }

  protected abstract get baseActions(): BaseActions;

  protected abstract get featureSelector(): MemoizedSelector<Record<string, unknown>, S, DefaultProjectorFn<S>>;

  public allWithGhosts() {
    this.store.dispatch(this.baseActions.allWithGhosts.action());
  }

  public all() {
    this.store.dispatch(this.baseActions.all.action());
  }

  public one(recordID: number) {
    const parameters = {};
    parameters[this.baseActions.one.parameterName] = recordID;
    this.store.dispatch(this.baseActions.one.action(parameters));
  }

  public insert(record: T) {
    const parameters = {};
    parameters[this.baseActions.insert.parameterName] = record;
    this.store.dispatch(this.baseActions.insert.action(parameters));
  }

  public update(record: T) {
    const parameters = {};
    parameters[this.baseActions.update.parameterName] = record;
    this.store.dispatch(this.baseActions.update.action(parameters));
  }

  public delete(recordID: number) {
    const parameters = {};
    parameters[this.baseActions.delete.parameterName] = recordID;
    this.store.dispatch(this.baseActions.delete.action(parameters));
  }

  public selectEntity(record: T) {
    const parameters = {};
    parameters[this.baseActions.update.parameterName] = record;
    this.store.dispatch(this.baseActions.select.action(parameters));
  }

  public deleteSelected() {
    this.store.dispatch(this.baseActions.delete.action());
  }

  public selectAll() {
    this.store.dispatch(this.baseActions.selectAll.action());
  }

  public selectNone() {
    this.store.dispatch(this.baseActions.selectNone.action());
  }

  public select(selector: any): Observable<any> {
    return this.store.select(selector);
  }
}
