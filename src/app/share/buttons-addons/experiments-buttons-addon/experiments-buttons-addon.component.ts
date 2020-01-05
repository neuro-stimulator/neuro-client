import { Component, OnInit } from '@angular/core';
import { ExperimentsButtonsAddonService } from './experiments-buttons-addon.service';

@Component({
  selector: 'app-experiments-buttons-addon',
  templateUrl: './experiments-buttons-addon.component.html',
  styleUrls: ['./experiments-buttons-addon.component.sass']
})
export class ExperimentsButtonsAddonComponent implements OnInit {

  constructor(private readonly _service: ExperimentsButtonsAddonService) { }

  ngOnInit() {
  }

  handleShowFilter() {
    this._service.filterRequest.next();
  }
}
