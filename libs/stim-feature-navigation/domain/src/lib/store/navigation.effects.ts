import { Injectable } from "@angular/core";
import { NavigationService } from "../infrastructure/navigation.service";

@Injectable()
export class NavigationEffects {

  constructor(private readonly navigation: NavigationService) {}



}
