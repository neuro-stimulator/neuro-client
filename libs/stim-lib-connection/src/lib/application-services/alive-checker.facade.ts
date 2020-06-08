import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as ConnectionActions from "../store/connection.actions";
import { Observable } from "rxjs";
import * as fromConnection from "../store/connection.state";
import { ConnectionInformation } from "../domain/connection-information";

@Injectable()
export class AliveCheckerFacade {

  constructor(private readonly store: Store<fromConnection.ConnectionInformationState>) {}

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

  get connectionInformation(): Observable<ConnectionInformation> {
    return this.store.select("connections");
  }
}
