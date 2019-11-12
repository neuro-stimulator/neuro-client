import { Component, OnInit } from '@angular/core';

import { AliveCheckerService } from '../alive-checker.service';
import { SerialService } from '../share/serial.service';
import { SettingsService } from './settings.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  fragment: string;

  constructor(

              private readonly _service: SettingsService,
              private readonly _route: ActivatedRoute,
              private readonly _router: Router) {
  }

  ngOnInit() {
    this._route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });
    if (this._route.snapshot.fragment === undefined) {
      this._router.navigate([], {fragment: 'service-state', relativeTo: this._route});
      return;
    }


    // this._gateway.rawData$.subscribe(data => {
    //   console.log(JSON.stringify(data));
    // });
  }


}
