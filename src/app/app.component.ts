import { Component } from '@angular/core';
import { Greeter } from 'diplomka-share';
import { NavigationService } from './navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'diplomka-frontend';

  xxx = Greeter('');

  constructor(public navigation: NavigationService) {}
}
