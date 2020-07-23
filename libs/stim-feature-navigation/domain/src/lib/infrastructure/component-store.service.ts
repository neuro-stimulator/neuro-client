import { Injectable, Type } from '@angular/core';

@Injectable()
export class ComponentStoreService {
  public pageToolsComponent: Type<any>;
  public addonComponent: Type<any>;
}
