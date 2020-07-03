import { BaseRecord } from '@diplomka-frontend/stim-lib-common';
import { ActionCreator, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export interface BaseActions {
  allWithGhosts: { action: ActionCreator<any, any> };
  all: { action: ActionCreator<any, any> };
  one: { action: ActionCreator<any, any>; parameterName: string };
  insert: { action: ActionCreator<any, any>; parameterName: string };
  update: { action: ActionCreator<any, any>; parameterName: string };
  delete: { action: ActionCreator<any, any>; parameterName: string };
}

export abstract class BaseFacade<T extends BaseRecord, S> {
  protected constructor(protected readonly store: Store<S>) {}

  public allWithGhosts() {
    this.store.dispatch(this.baseActions.allWithGhosts.action({}));
  }
  public all() {
    this.store.dispatch(this.baseActions.all.action({}));
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

  protected abstract get baseActions(): BaseActions;

  protected abstract get stateKey(): string;

  public get state(): Observable<S> {
    // @ts-ignore
    return this.store.select(this.stateKey);
  }

  public select(selector: any): Observable<any> {
    return this.store.select(selector);
  }
}
