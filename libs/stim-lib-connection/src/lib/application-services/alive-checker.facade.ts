import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ConnectionActions from '../store/connection.actions';
import { Observable } from 'rxjs';
import * as fromConnection from '../store/connection.reducers';
import { ConnectionInformationState } from '../store/connection.state';

@Injectable()
export class AliveCheckerFacade {
  constructor(private readonly store: Store<ConnectionInformationState>) {}

  /**
   * Pokusí se vytvořit stále spojení se serverem.
   */
  public requestConnect() {
    this.store.dispatch(ConnectionActions.actionServerConnectRequest({}));
  }

  /**
   * Oznámí zbytku aplikace, aby byla ukončena komunikace přes WebSockety se serverem.
   */
  public requestDisconnect() {
    this.store.dispatch(ConnectionActions.actionServerDisconnectRequest({}));
  }

  public startCommunication() {
    this.store.dispatch(ConnectionActions.actionServerStartCommunicating({}));
  }

  public stopCommunication() {
    this.store.dispatch(ConnectionActions.actionServerEndCommunicating({}));
  }

  get state(): Observable<ConnectionInformationState> {
    return this.store.select(fromConnection.connectionFeature);
  }
}
