import { Component } from '@angular/core';
import { Greeter } from 'diplomka-share';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'diplomka-frontend';

  xxx = Greeter('');
}
