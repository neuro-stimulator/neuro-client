import { BaseRecord } from "@diplomka-frontend/stim-lib-common";
import { ActionCreator, Store } from "@ngrx/store";
import { Observable } from "rxjs";

export interface BaseActions {
  all: {action: ActionCreator<any, any>};
  one: {action: ActionCreator<any, any>, parameterName: string};
  insert: {action: ActionCreator<any, any>, parameterName: string};
  update: {action: ActionCreator<any, any>, parameterName: string};
  delete: {action: ActionCreator<any, any>, parameterName: string};
}

export abstract class BaseFacade<T extends BaseRecord, S> {

  protected constructor(protected readonly store: Store<S>) {}

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

  public abstract get state(): Observable<S>;
}
