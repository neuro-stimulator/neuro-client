import { Component } from '@angular/core';

import { NavigationService } from './navigation/navigation.service';
import { SerialService } from './share/serial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(public readonly navigation: NavigationService,
              private readonly serial: SerialService) { }
}
