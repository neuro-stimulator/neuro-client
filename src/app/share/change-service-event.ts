import { CRUDServiceType } from './crud-service-type';

export interface ChangeServiceEvent<T> {
  record: T;
  changeType: CRUDServiceType;
}
