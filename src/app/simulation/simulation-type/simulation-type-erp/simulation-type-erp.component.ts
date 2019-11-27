import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { ExperimentERP } from 'diplomka-share';
import { SequenceService } from '../../../share/sequence.service';

@Component({
  selector: 'app-simulation-type-erp',
  templateUrl: './simulation-type-erp.component.html',
  styleUrls: ['./simulation-type-erp.component.sass']
})
export class SimulationTypeErpComponent implements OnInit, OnDestroy {

  // Pie
  readonly pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          return ctx.chart.data.labels[ctx.dataIndex];
        },
      },
    }
  };
  pieChartLabels: Label[] = []; // = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  pieChartData: number[] = []; // = [300, 500, 100];
  readonly pieChartType: ChartType = 'pie';
  readonly pieChartLegend = true;
  readonly pieChartPlugins = [pluginDataLabels];
  readonly pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)',
        '#0b0033', '#370031', '#832232', '#ce8964', '#eaf27c'
      ],
    },
  ];

  flowData = [];

  outputs = [];

  private paramsSubscription: Subscription;

  constructor(private readonly _service: SequenceService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
  }

  private _handleParams(params: Params) {
    if (params['id'] === undefined) {
      this.router.navigate(['experiments']);
      return;
    }

    const experimentID = +params['id'];
    this.pieChartLabels.splice(0);
    this.pieChartData.splice(0);

    this._service.generate(experimentID, 100)
        .then(result => {
          this.flowData = result.sequence;
          const experiment = result.experiment as ExperimentERP;
          const analyse = result.analyse;

          this.outputs.splice(0);
          for (let i = 0; i <= experiment.outputCount; i++) {
            this.outputs.push(i);
          }

          delete analyse['0'];
          for (const key of Object.keys(analyse)) {
            const data = analyse[key];
            this.pieChartLabels.push(key);
            this.pieChartData.push(data['value']);
          }
        });
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this._handleParams(params);
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
